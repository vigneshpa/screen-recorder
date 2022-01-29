import { registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

const basePath = import.meta.env.BASE_URL + 'streaming-downloads/';

const responses = new Map<string, Response>();

const controllers = new Map<string, ReadableStreamDefaultController<Uint8Array>>();

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
    registerStreamingDownloads(e.data);
  } else if (e.data.type === 'streaming-downloads-revoke') {
    const path = basePath + e.data.filename;
    if (responses.has(path)) responses.delete(path);
  } else if (e.data.type === 'streaming-downloads-response-chunked') {
    const id: string = e.data.id;
    const preque: Uint8Array[] = [];
    controllers.set(id, {
      enqueue: (chunk: Uint8Array | undefined) => {
        if (chunk) preque.push(chunk);
      },
    } as any);
    e.data.stream = new ReadableStream({
      start(controller) {
        controllers.set(id, controller);
        preque.forEach(chunk => controller.enqueue(chunk));
      },
    });
    registerStreamingDownloads(e.data);
  } else if (e.data.type === 'streaming-downloads-response-chunk') {
    const { id, data: chunk } = e.data as { id: string; data: Uint8Array };
    if (controllers.has(id)) {
      controllers.get(id)!.enqueue(chunk);
    } else console.warn('No such id to enque the chunk');
  } else if (e.data.type === 'streaming-downloads-response-stop') {
    const { id } = e.data as { id: string };
    if (controllers.has(id)) {
      controllers.get(id)!.close();
      controllers.delete(id);
    } else console.warn('No such stream id to close');
  }
});
function registerStreamingDownloads(data: {
  filename: string;
  stream: ReadableStream<Uint8Array>;
  headers: [string, string][];
  status: number;
}) {
  const path = basePath + data.filename;

  const resOld = responses.has(path);
  if (resOld) responses.delete(path);

  const headers = new Headers();
  data.headers.forEach(val => headers.set(val[0], val[1]));
  responses.set(path, new Response(data.stream, { headers, status: data.status }));
  console.log('registering', path);
}
