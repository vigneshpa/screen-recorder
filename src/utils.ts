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
