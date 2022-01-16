<script lang="ts">
  import Number from './Number.svelte';
  import Recorder from './Recorder';
  import Switch from './Switch.svelte';
  import RecordSwitch from './RecordSwitch.svelte';
  import { fade } from 'svelte/transition';
  import { countdown, wait } from './utils';

  const oldState = JSON.parse(
    localStorage.getItem('screen-recorder-app-state') ||
      JSON.stringify({
        systemAudio: true,
        micAudio: false,
        saveImediately: true,
        timeOut: 5,
      })
  );
  let vid: HTMLVideoElement;
  let r: Recorder;
  let systemAudio: boolean = oldState.systemAudio;
  let micAudio: boolean = oldState.micAudio;
  let saveImediately: boolean = oldState.saveImediately;
  let timeOut: number = oldState.timeOut;
  let recording = false;
  let counter = 0;
  let counting = false;
  let stage = 0;
  $: {
    localStorage.setItem(
      'screen-recorder-app-state',
      JSON.stringify({
        systemAudio,
        micAudio,
        saveImediately,
        timeOut,
      })
    );
  }
  async function reset() {
    recording = false;
    stage = 0;
  }
  async function select() {
    r = new Recorder({ microphone: micAudio, systemAudio, timeslice: 5000 });
    r.addEventListener('stopping', reset);
    r.addEventListener('error', reset);
    (window as any).r = r;
    vid.srcObject = r.rStream;
    vid.play();
    await r.requestStreams();
    stage++;
  }
  async function toogle() {
    if (recording) {
      r.stop();
    } else {
      counting = true;
      for await (let i of countdown(timeOut)) counter = i;
      counting = false;
      r.saveStream();
      recording = true;
      stage++;
    }
  }
</script>

<div class="vid">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video bind:this={vid} muted />
</div>
<div class="overlay">
  <div class="pannel">
    <div class="options" class:hidden={stage !== 0}>
      <Switch bind:value={systemAudio}>Record system audio</Switch>
      <Switch bind:value={micAudio}>Record from microphone</Switch>
      <Switch bind:value={saveImediately}>Save video while recroding (recomended)</Switch>
      <button on:click={() => select()}>Select Screen</button>
    </div>
    <div class="countdown" class:hidden={stage !== 1}>
      <Number bind:value={timeOut}>Countdown</Number>
    </div>
    <div class="record" class:hidden={stage !== 2 && stage !== 1}>
      <RecordSwitch bind:recording {toogle} />
    </div>
  </div>
  {#if counting}
    <div transition:fade class="counter">{counter}</div>
  {/if}
</div>

<style>
  :global(body) {
    color: white;
    background-color: #131313;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
  :global(:root) {
    font-size: 14px;
  }
  .vid {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    /* background-color: green; */
    z-index: -1;
  }
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    z-index: 0;
  }
  .counter {
    text-align: center;
    font-size: 10rem;
    line-height: 100%;
    width: 100%;
    height: 100%;
    background-color: rgba(48, 48, 48, 0.76);
    position: absolute;
    margin: auto;
  }
  .pannel {
    background-color: rgba(37, 37, 37, 0.959);
    padding: 2rem;
    bottom: 0;
    position: absolute;
    margin: 2rem;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .pannel > div {
    transition: max-height 0.7s ease;
    max-height: 13rem;
    overflow: hidden;
  }
  .pannel > .hidden {
    max-height: 0px;
    overflow: hidden;
  }
  video {
    width: 100%;
    height: 100%;
  }
  button {
    padding: 0.7rem;
    font-size: 1rem;
    margin: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: rgb(214, 214, 214);
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: rgb(141, 141, 141);
  }
  button:active {
    background-color: rgb(75, 75, 75);
  }
</style>
