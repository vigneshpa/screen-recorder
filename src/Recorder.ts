interface RecorderConfig {
  systemAudio: boolean;
  microphone: boolean;
  timeslice?: number;
}
import { getBlobToUint8Stream, streamSaver } from './streams';
export default class Recorder extends window.EventTarget {
  config: RecorderConfig;
  recorder: MediaRecorder;
  rStream: MediaStream;
  aDest: MediaStreamAudioDestinationNode;
  aCtx: AudioContext;
  writer?: WritableStreamDefaultWriter<Blob>;
  state: 'idle' | 'gotPermissions' | 'error' | 'recording' | 'stopped' | 'stopping';
  constructor(config: RecorderConfig) {
    super();
    this.config = config;
    this.rStream = new MediaStream();
    this.recorder = new MediaRecorder(this.rStream);
    this.aCtx = new AudioContext();
    this.aDest = this.aCtx.createMediaStreamDestination();
    this.state = 'idle';
  }
  async requestScreen() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    if (stream.getVideoTracks().length < 1) this.throwError('Unable to get video');
    stream.getVideoTracks().forEach(trk => this.rStream.addTrack(trk));
    if (this.config.systemAudio) this.config.systemAudio = stream.getAudioTracks().length > 0;
    if (this.config.systemAudio) this.aCtx.createMediaStreamSource(stream).connect(this.aDest);
    this.recorder.addEventListener('stop', e =>
      setTimeout(e => stream.getTracks().forEach(trk => trk.stop()), 300)
    );
    stream.getVideoTracks()[0].addEventListener('ended', () => this.stop());
  }
  async requestMicrophone() {
    if (!this.config.microphone) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.config.microphone = stream.getAudioTracks().length > 0;
    if (!this.config.microphone) return;
    this.aCtx.createMediaStreamSource(stream!).connect(this.aDest);
  }
  async requestStreams() {
    if (this.state !== 'idle') this.throwError('Recorder is not idle');
    await this.requestScreen();
    await this.requestMicrophone();
    if (this.config.microphone || this.config.systemAudio)
      this.aDest.stream.getAudioTracks().forEach(trk => this.rStream.addTrack(trk));
    this.state = 'gotPermissions';
    this.dispatchEvent(new Event('gotPermissions'));
    return this.rStream;
  }
  saveStream() {
    if (this.state !== 'gotPermissions') this.throwError("The recorder's state is invalid");
    const ext = this.recorder.mimeType.split(';')[0].split('/')[1] || 'webm';
    const trns = getBlobToUint8Stream();
    const writer = trns.writable.getWriter();
    const saver = streamSaver.createWriteStream('output.' + ext);
    trns.readable.pipeTo(saver);
    this.recorder.addEventListener('dataavailable', e => writer.write(e.data));
    this.recorder.addEventListener('stop', e =>
      setTimeout(e => {
        writer.close();
        this.state = 'stopped';
        this.dispatchEvent(new Event('stopped'));
      }, 1000)
    );
    this.recorder.start(this.config.timeslice);
    this.state = 'recording';
  }
  stop() {
    if (this.state === 'recording') this.recorder.stop();
    else this.throwError('Cannot stop recording');
    this.state = 'stopping';
    this.dispatchEvent(new Event('stopping'));
  }
  throwError(error: string) {
    const err = new Error(error);
    this.state = 'error';
    const evnt: any = new Event('error');
    evnt.error = err;
    this.dispatchEvent(evnt);
    throw err;
  }
}
