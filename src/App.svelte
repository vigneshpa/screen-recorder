<script lang="ts">
  let videoEl: HTMLVideoElement;
  function videoResponder(video: HTMLVideoElement, scr: MediaStream | null) {
    if (!video) return;
    video.srcObject = scr ? new MediaStream(scr.getVideoTracks()) : null;
    if (scr) video.play();
  }

  let recorder: MediaRecorder | null = null;
  let screen: MediaStream | null = null;
  let userAudio: MediaStream | null = null;
  let enableUserAudio = false;
  let enableSystemAudio = true;
  let countDown = 5;
  const audioResponder = async (enable: boolean) => {
    if (!enable) {
      userAudio?.getTracks().forEach(trk => trk.stop());
      userAudio = null;
      enableUserAudio = false;
      return;
    }
    userAudio = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!userAudio) enableUserAudio = false;
  };
  $: audioResponder(enableUserAudio);
  $: videoResponder(videoEl, screen);

  async function select() {
    screen = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    screen.getVideoTracks()[0].addEventListener('ended', e => recorder?.stop() || stop(e as any));
  }
  let rStream: MediaStream;
  async function record() {
    if (!screen) return alert('Select screen first');
    if (recorder) return alert('Already recording');
    rStream = new MediaStream();
    screen.getVideoTracks().forEach(trk => rStream.addTrack(trk));

    // Audio Pipelining
    {
      const context = new AudioContext();
      const dest = context.createMediaStreamDestination();
      if (screen.getAudioTracks().length === 0) enableSystemAudio = false;
      if (enableSystemAudio) context.createMediaStreamSource(screen).connect(dest);
      if (enableUserAudio) context.createMediaStreamSource(userAudio!).connect(dest);
      if (enableSystemAudio || enableUserAudio) dest.stream.getAudioTracks().forEach(trk => rStream.addTrack(trk));
    }

    recorder = new MediaRecorder(rStream);
    recorder.start();
    recorder.addEventListener('dataavailable', stop);
  }
  let countDownStarted = false;
  function startCountDown() {
    if (!screen) return alert('Select screen first');
    if (recorder) return alert('Already recording');
    if (countDownStarted) return alert('Countdown already started');
    countDownStarted = true;
    const int = setInterval(() => {
      if (countDown-- === 0) {
        record();
        clearInterval(int);
        countDown = 5;
        countDownStarted = false;
      }
    }, 1000);
  }
  async function stop(e: Event) {
    if (countDownStarted) return alert("Can't do anything while count down");
    const data: Blob = (e as any).data;
    if (data) window.open(URL.createObjectURL(data), '_blank', 'menubar=no,height=400,width=700');
    rStream?.getTracks().forEach(trk => trk.stop);
    recorder = null;
    screen?.getTracks().forEach(trk => trk.stop());
    screen = null;
    userAudio?.getTracks().forEach(trk => trk.stop());
    userAudio = null;
    enableUserAudio = false;
    enableSystemAudio = true;
    countDown = 5;
  }
</script>

<h1>Hello</h1>
<button on:click={() => select()}>Select</button>
<button on:click={() => startCountDown()}>Record</button>
<button on:click={e => recorder?.stop() || stop(e)}>Stop</button><br />
<input type="checkbox" id="sysAudio" bind:checked={enableSystemAudio} />
<label for="sysAudio">System Audio</label><br />
<input type="checkbox" id="userAudio" bind:checked={enableUserAudio} />
<label for="userAudio">Audio from microphone</label><br />
<label for="countdown">Count down in seconds</label>
<input id="countdown" type="number" bind:value={countDown} />
<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={videoEl} width="1000" />
