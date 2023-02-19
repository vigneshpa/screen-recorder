import { registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

const basePath = import.meta.env.BASE_URL + 'streaming-downloads/';

const responses = new Map<string, Response>();

registerRoute(
  ({ url }) => url.pathname.startsWith(basePath),
  async ({ url }) => {
    const filename = url.pathname.slice(basePath.length);
    if (filename === "ping")
      return new Response("pong", { status: 200 });

    if (!responses.has(filename))
      return new Response(
        `No stream exists!\nYou cannot download a file again in streaming downloads\nAre you sharing the download url 😒`,
        {
          status: 404,
          headers: new Headers({
            'Content-Type': 'text/plain;charset=UTF-8',
          }),
        }
      );

    const response = responses.get(filename)!;
    responses.delete(filename);
    return response;
  }
);
self.addEventListener('message', e => {
  if (!e.isTrusted) return console.log('Message from an untrustworthy page');
  if (e.data.type === 'streaming-downloads-response')
    registerStreamingDownloads(e.data);
  else if (e.data.type === 'streaming-downloads-revoke')
    if (responses.has(e.data.filename)) responses.delete(e.data.filename);
});

export interface StreamingDownloadResponse {
  filename: string;
  stream: ReadableStream<Uint8Array> | MessagePort;
  headers: [string, string][];
  status: number;
};

function registerStreamingDownloads(data: StreamingDownloadResponse) {
  const filename = data.filename;

  const resOld = responses.has(filename);
  if (resOld) responses.delete(filename);

  const headers = new Headers();
  data.headers.forEach(val => headers.set(val[0], val[1]));

  const stream =
    (data.stream instanceof MessagePort) ? messagePortToStream(data.stream) : data.stream;

  responses.set(filename, new Response(stream, { headers, status: data.status }));
  console.log('registering', filename);
}

function messagePortToStream(port:MessagePort):ReadableStream<Uint8Array>{
  return new ReadableStream({
    start(controller) {
        port.addEventListener("message", e=>{
          if(!(e.data instanceof Uint8Array)){
            if(e.data === "close")
              controller.close();
            if(e.data === "error")
              controller.error();
            return console.log("Unknown message recived");
          }
          controller.enqueue(e.data);
        });
        port.postMessage("start");
    },
    pull(controller) {
        port.postMessage("pull");
    },
    cancel(reason){
      port.postMessage("cancel");
    }
  });
}