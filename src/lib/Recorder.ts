import { saveStream } from './streaming-download';
import { saveBlob } from './utils';

interface RecorderConfig {
  systemAudio: boolean;
  microphone: boolean;
  timeslice?: number;
}
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
    this.recorder.addEventListener('stop', _ =>
      setTimeout(_ => stream.getTracks().forEach(trk => trk.stop()), 300)
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
    if (this.config.timeslice) {
      const recorder = this;
      const readable = new ReadableStream<Uint8Array>({
        start(controller) {
          recorder.recorder.addEventListener('dataavailable', async e =>
            controller.enqueue(new Uint8Array(await e.data.arrayBuffer()))
          );
          recorder.recorder.addEventListener('stop', _ =>
            setTimeout(_ => {
              controller.close();
              recorder.state = 'stopped';
              recorder.dispatchEvent(new Event('stopped'));
            }, 1000)
          );
        },
      });
      saveStream('output.' + ext, readable);
      this.recorder.start(this.config.timeslice);
      setTimeout(() => this.recorder.requestData(), 1000);
    } else {
      this.recorder.addEventListener('dataavailable', e => saveBlob('output', e.data));
      this.recorder.addEventListener('stop', _ => {
        this.state = 'stopped';
        this.dispatchEvent(new Event('stopped'));
      });
      this.recorder.start();
    }
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
