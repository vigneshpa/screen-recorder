import { downloadURL } from './utils';
export function saveStream(
  filename: string,
  blobStream: ReadableStream<Blob>,
  contentType: string = 'application/octet-stream'
) {
  // if ('showSaveFilePicker' in window) {
  //   window
  //     .showSaveFilePicker({
  //       suggestedName: filename,
  //     })
  //     .then(async handle => {
  //       const writer = await handle.createWritable();
  //       const reader = blobStream.getReader();
  //       while (true) {
  //         const { value, done } = await reader.read();
  //         if (done) break;
  //         await writer.write(value!);
  //       }
  //       writer.close();
  //     });
  //   return;
  // }
  if (!window.navigator.serviceWorker.controller) throw new Error('No service worker registered');
  const stream = blobToUint8ArrayStream(blobStream);
  const headers: [string, string][] = [];
  headers.push(['Content-Disposition', `attachment; filename="${filename}"`]);
  headers.push(['Content-Type', contentType]);
  headers.push(['Connection', 'close']);
  headers.push(['Cache-Control', 'no-cache']);
  try {
    window.navigator.serviceWorker.controller.postMessage(
      {
        type: 'streaming-downloads-response',
        filename,
        stream,
        headers,
        status: 200,
      },
      [stream as any]
    );
  } catch (e) {
    console.warn(e);
    const id = Math.floor(Math.random() * 10 ** 5);
    window.navigator.serviceWorker.controller.postMessage({
      type: 'streaming-downloads-response-chunked',
      filename,
      headers,
      id,
      status: 200,
    });
    const reader = stream.getReader();
    (function read() {
      reader.read().then(({ done, value }) => {
        if (!done) {
          window.navigator.serviceWorker.controller!.postMessage({
            type: 'streaming-downloads-response-chunk',
            id,
            data: value,
          });
          read();
        } else {
          window.navigator.serviceWorker.controller!.postMessage({
            type: 'streaming-downloads-response-stop',
            id,
          });
        }
      });
    })();
  }
  window.addEventListener('beforeunload', _ =>
    window.navigator.serviceWorker.controller!.postMessage({
      type: 'streaming-downloads-revoke',
      filename,
    })
  );
  setTimeout(() => downloadURL(import.meta.env.BASE_URL + 'streaming-downloads/' + filename), 1000);
}

function blobToUint8ArrayStream(instream: ReadableStream<Blob>) {
  let reader: ReadableStreamReader<Blob>;
  return new ReadableStream<Uint8Array>({
    start() {
      reader = instream.getReader();
    },
    async pull(controller) {
      const { value, done } = await reader.read();
      if (done) controller.close();
      else controller.enqueue(new Uint8Array(await value!.arrayBuffer()));
    },
  });
}
