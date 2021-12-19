declare module '*.svelte' {
  import 'svelte';
}
declare module '*.html' {
  const content: string;
  export default content;
}
