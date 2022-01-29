import { downloadURL } from './utils';
export function saveStream(
  filename: string,
  stream: ReadableStream<Uint8Array>,
  contentType: string = 'application/octet-stream'
) {
  if (!window.navigator.serviceWorker.controller) throw new Error('No service worker registered');
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
