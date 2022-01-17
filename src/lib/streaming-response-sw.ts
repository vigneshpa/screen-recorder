import { registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

const basePath = import.meta.env.BASE_URL + 'streaming-downloads/';

const responses = new Map<string, Response>();

registerRoute(
  ({ url }) => url.pathname.startsWith(basePath),
  async ({ url }) => {
    if (!responses.has(url.pathname))
      return new Response(
        `The file you are trying to download is no longer available.\nTry reloading this page`,
        {
          status: 404,
        }
      );
    const response = responses.get(url.pathname)!;
    return response;
  }
);

self.addEventListener('message', e => {
  if (!e.isTrusted) return console.log('Request from non trustworthy page');
  if (e.data.type === 'streaming-downloads-response') {
    const data = e.data as {
      filename: string;
      stream: ReadableStream<Uint8Array>;
      headers: [string, string][];
    };
    const path = basePath + data.filename;

    const resOld = responses.has(path);
    if (resOld) responses.delete(path);

    const headers = new Headers();
    data.headers.forEach(val => headers.set(val[0], val[1]));
    responses.set(path, new Response(data.stream, { headers }));
    console.log('registering', path);
  } else if (e.data.type === 'streaming-downloads-revoke') {
    const path = basePath + e.data.filename;
    if (responses.has(path)) responses.delete(path);
  }
});
