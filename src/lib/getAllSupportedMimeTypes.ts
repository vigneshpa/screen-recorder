type VideoCodec = string;
type AudioCodec = string;
type Container = string;
type containerDetails = Map<VideoCodec, AudioCodec[]>;
export default function getAllSupportedMimeTypes() {
  const containerFormats = ['webm', 'x-matroska', 'mp4', 'ogg'];
  const videoCodecs = [
    ['av1', 'av01', 'vp10'],
    ['vp9', 'vp09', 'vp9.0'],
    ['h265', 'h.265', 'hevc'],
    ['vp8', 'vp08', 'vp8.0'],
    ['avc1', 'h264', 'h.264'],
    ['theora'],
    ['h263', 'h.263'],
    ['mp4v'],
  ];
  const audioCodecs = [['opus'], ['aac'], ['vorbis'], ['mp4a']];
  const ret: Map<Container, containerDetails> = new Map();
  for (let container of containerFormats) {
    if (!MediaRecorder.isTypeSupported('video/' + container)) continue;
    const cont: containerDetails = new Map();

    for (let videoCodecVariants of videoCodecs) {
      const videoCodec = videoCodecVariants.find(vc =>
        MediaRecorder.isTypeSupported('video/' + container + ';codecs="' + vc + '"')
      );
      if (!videoCodec) continue;
      const supportedAudios = [] as string[];

      for (let audioCodecVariants of audioCodecs) {
        const audioCodec = audioCodecVariants.find(ac =>
          MediaRecorder.isTypeSupported('video/' + container + ';codecs="' + videoCodec + ',' + ac + '"')
        );
        if (!audioCodec) continue;
        supportedAudios.push(audioCodec);
      }

      cont.set(videoCodec, supportedAudios);
    }

    ret.set(container, cont);
  }
  return ret;
}

export const extesnstions = new Map([
  ['webm', 'webm'],
  ['x-matroska', 'mkv'],
  ['mp4', 'mp4'],
  ['ogg', 'ogg'],
]);
