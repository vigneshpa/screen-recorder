import type { StreamingDownloadResponse } from './streaming-response-sw';
import { downloadURL } from './utils';
export function saveStream(
  filename: string,
  blobStream: ReadableStream<Blob>,
  contentType?: string
) {
  contentType = contentType || 'application/octet-stream';
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
      } as StreamingDownloadResponse,
      [stream]
    );
  } catch (e) {
    console.warn(e, "Trying with message channel");

    const channel = new MessageChannel();

    const port = channel.port1;

    let reader: ReadableStreamDefaultReader<Uint8Array>;
    port.addEventListener("message", async e => {
      try {
        if (e.data === "start") {
          reader = stream.getReader();
        } else if (e.data === "pull") {
          const { value, done } = await reader.read();
          if (done) port.postMessage("close");
          else port.postMessage(value);
        } else if (e.data === "cancel") {
          reader.cancel();
        }
      } catch (e) {
        port.postMessage("error");
      }
    });

    window.navigator.serviceWorker.controller.postMessage({
      filename,
      headers,
      status: 200,
      stream: channel.port2
    } as StreamingDownloadResponse
      , [channel.port2]);

  }
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
    cancel(reason) {
      reader.cancel(reason);
    }
  });
}
