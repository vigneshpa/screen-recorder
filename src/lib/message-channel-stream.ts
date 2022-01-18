export function passStream<T extends any>(
  stream: ReadableStream<T>,
  port: MessagePort,
  getTransferables = (_chunk: T) => [] as any[]
) {
  console.warn('Using postMessage to stream between a message channel');
  let reader: ReadableStreamDefaultReader<T>;
  port.onmessage = async e => {
    const message = e.data;
    if (message === 'start') {
      reader = stream.getReader();
      return;
    } else if (message === 'cancel') {
      return reader.cancel();
    }
    if (!reader) throw new Error('Cannot pull before start');
    const { done, value } = await reader.read();
    if (value) port.postMessage(value, { transfer: getTransferables(value) });
    if (done) port.postMessage('stop');
  };
  port.onmessageerror = e => console.error(e);
}
export function getStream<T extends any>(port: MessagePort): ReadableStream<T> {
  let resolve: (chunk: T) => void;
  const stream = new ReadableStream<T>({
    start(controller) {
      resolve = e => controller.enqueue(e);
      port.onmessage = e => {
        const data: 'stop' | 'error' | T = e.data;
        if (typeof data === 'string') {
          if (data === 'error') controller.error();
          else if (data === 'stop') controller.close();
        } else {
          resolve(data);
        }
      };
      port.postMessage('start');
    },
    pull(controller) {
      return new Promise<void>(res => {
        resolve = chunk => {
          controller.enqueue(chunk);
          resolve = e => controller.enqueue(e);
          res();
        };
        port.postMessage('pull');
      });
    },
    cancel() {
      port.postMessage('cancel');
    },
  });
  return stream;
}
