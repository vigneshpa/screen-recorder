export async function wait(time: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(() => resolve(), time));
}
export async function* countdown(times: number, delay: number = 1000) {
  for (let i = 0; i <= times; i++) {
    yield times - i;
    if (times === i) break;
    await wait(delay);
  }
}
export function getBlobToUint8Stream() {
  return new TransformStream<Blob, Uint8Array>({
    async transform(chunk, controller) {
      controller.enqueue(new Uint8Array(await chunk.arrayBuffer()));
    },
  });
}
export function saveBlob(filename: string, blob: Blob) {
  const link = document.createElement('a');
  link.hidden = true;
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url));
}