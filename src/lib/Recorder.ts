import { saveStream } from './streaming-download';
import { saveBlob, wait } from './utils';

interface RecorderConfig {
  systemAudio: boolean;
  microphone: boolean;
  timeslice?: number;
  mime: string;
  ext: string;
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
    this.recorder = new MediaRecorder(this.rStream, { mimeType: this.config.mime });
    this.aCtx = new AudioContext();
    this.aDest = this.aCtx.createMediaStreamDestination();
    this.state = 'idle';
  }
  async requestScreen() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: this.config.systemAudio,
    });
    if (stream.getVideoTracks().length < 1) this.throwError('Unable to get video');
    stream.getVideoTracks().forEach(trk => this.rStream.addTrack(trk));
    if (this.config.systemAudio) this.config.systemAudio = stream.getAudioTracks().length > 0;
    if (this.config.systemAudio) this.aCtx.createMediaStreamSource(stream).connect(this.aDest);
    this.recorder.addEventListener('stop', _ => setTimeout(_ => stream.getTracks().forEach(trk => trk.stop()), 300));
    stream.getVideoTracks()[0].addEventListener('ended', () => this.stop());
  }
  async requestMicrophone() {
    if (!this.config.microphone) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.config.microphone = stream.getAudioTracks().length > 0;
    if (!this.config.microphone) return;
    this.recorder.addEventListener('stop', _ => setTimeout(_ => stream.getTracks().forEach(trk => trk.stop()), 300));
    this.aCtx.createMediaStreamSource(stream!).connect(this.aDest);
  }
  async requestStreams() {
    if (this.state !== 'idle') this.throwError('Recorder is not idle');
    await this.requestMicrophone();
    await this.requestScreen();
    if (this.config.microphone || this.config.systemAudio)
      this.aDest.stream.getAudioTracks().forEach(trk => this.rStream.addTrack(trk));
    this.state = 'gotPermissions';
    this.dispatchEvent(new Event('gotPermissions'));
    return this.rStream;
  }
  saveStream(filename = 'screencapture-' + new Date().toLocaleDateString().replaceAll('/', '-')) {
    if (this.state !== 'gotPermissions') this.throwError("The recorder's state is invalid");
    if (this.config.timeslice && window.navigator.serviceWorker.controller) {
      const recorder = this;
      let enqueue: (chunk: Blob) => void;
      let resolve: (() => void) | null;
      const readable = new ReadableStream<Blob>({
        start(controller) {
          enqueue = e => {
            controller.enqueue(e);
            wait(recorder.config.timeslice).then(() => {
              if (resolve) {
                resolve();
                resolve = null;
              }
            });
          };
          recorder.recorder.addEventListener('dataavailable', async e => {
            enqueue(e.data);
          });
          recorder.recorder.addEventListener('stop', _ => {
            wait(recorder.config.timeslice! * 2).then(() => controller.close());
            recorder.state = 'stopped';
            recorder.dispatchEvent(new Event('stopped'));
          });
        },
        pull() {
          return new Promise(res => {
            resolve = res;
            if (recorder.recorder.state === 'recording') recorder.recorder.requestData();
          });
        },
        cancel() {
          recorder.stop();
        },
      });
      saveStream(filename + '.' + this.config.ext, readable, this.config.mime);
      this.recorder.start();
    } else {
      this.recorder.addEventListener('dataavailable', e => saveBlob(filename + '.' + this.config.ext, e.data));
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
    this.aCtx.close();
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
