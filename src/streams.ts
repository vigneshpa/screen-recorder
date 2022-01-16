import * as streamSaver from 'streamsaver';
import mitm from 'streamsaver/mitm.html';
import mitm_sw from 'streamsaver/sw.js?raw';
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
(window as any).sw_js = mitm_sw;
(streamSaver as any).mitm = mitm;
export { streamSaver };
export function getBlobToUint8Stream() {
  return new TransformStream<Blob, Uint8Array>({
    async transform(chunk, controller) {
      controller.enqueue(new Uint8Array(await chunk.arrayBuffer()));
    },
  });
}
