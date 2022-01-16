import * as streamSaver from 'streamsaver';
if (!window.WritableStream) {
  import('web-streams-polyfill/ponyfill/es2018').then(pfill => {
    for (const key in pfill) {
      if (Object.prototype.hasOwnProperty.call(pfill, key)) {
        (window as any)[key] = (pfill as any)[key];
      }
    }
    (streamSaver as any).WritableStream = pfill.WritableStream;
    (streamSaver as any).TransformStream = pfill.TransformStream;
  });
}
const mitm = new URL('streamsaver/mitm.html', import.meta.url);
const mitm_js = new URL('streamsaver/sw.js', import.meta.url);
(streamSaver as any).mitm = mitm;
export { streamSaver };
export function getBlobToUint8Stream() {
  return new TransformStream<Blob, Uint8Array>({
    async transform(chunk, controller) {
      controller.enqueue(new Uint8Array(await chunk.arrayBuffer()));
    },
  });
}
