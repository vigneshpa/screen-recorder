export function saveStream(
  filename: string,
  stream: ReadableStream<Uint8Array>,
  contentType: string = 'application/octet-stream'
) {
  if (!window.navigator.serviceWorker.controller) throw new Error('No service worker registered');
  const headers = new Map();
  headers.set('Content-Disposition', `attachment; filename="${filename}"`);
  headers.set('Content-Type', contentType);
  window.navigator.serviceWorker.controller.postMessage(
    {
      type: 'streaming-downloads-response',
      filename,
      stream,
      headers,
    },
    [stream as any]
  );
  window.addEventListener('beforeunload', _ =>
    window.navigator.serviceWorker.controller!.postMessage({
      type: 'streaming-downloads-revoke',
      filename,
    })
  );
  setTimeout(() => window.open('/streaming-downloads/' + filename, '_blank'), 2000);
}
