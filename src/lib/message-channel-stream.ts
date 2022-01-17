export function passStream<T extends any>(
  stream: ReadableStream<T>,
  port: MessagePort,
  getTransferables = (_chunk: T) => [] as any[]
) {
  console.warn('Using postMessage to stream between a message channel');
  const ping = window.setInterval(() => port.postMessage('ping'), 1000);
  port.start();
  port.addEventListener('messageerror', e => console.error(e));
  port.addEventListener('message', async e => {
    const message = e.data;
    if (message === 'start') {
      const reader = stream.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (value) port.postMessage(value, { transfer: getTransferables(value) });
        if (done) {
          clearInterval(ping);
          port.postMessage('stop');
          break;
        }
      }
    }
  });
}
export function getStream<T extends any>(port: MessagePort): ReadableStream<T> {
  const stream = new ReadableStream<T>({
    start(controller) {
      port.start();
      port.addEventListener('message', e => {
        const data: 'stop' | 'error' | T = e.data;
        if (typeof data === 'string') {
          if (data === 'error') controller.error();
          else if (data === 'stop') controller.close();
        } else {
          controller.enqueue(data);
        }
      });
      port.postMessage('start');
    },
  });
  return stream;
}
