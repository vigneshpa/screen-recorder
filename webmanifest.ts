import { join } from 'path';
export default function getManifest(publicPath) {
  const sizes = [96, 128, 192, 256, 384, 512];
  function generateIconSources(src) {
    const ret = [];
    if (src) {
      ret.push({ src: join(publicPath, src + '.svg'), sizes: '1024x1024', purpose: 'any' });
      ret.push({
        src: join(publicPath, src + '_maskable.svg'),
        sizes: '1024x1024',
        purpose: 'maskable',
      });
      sizes.forEach(size => {
        ret.push({
          src: join(publicPath, src + size + '.png'),
          sizes: size + 'x' + size,
          purpose: 'any',
        });
        ret.push({
          src: join(publicPath, src + '_maskable' + size + '.png'),
          sizes: size + 'x' + size,
          purpose: 'maskable',
        });
      });
    }
    return ret;
  }
  const manifest = {
    name: 'Screen Recorder',
    short_name: 'Screen Recorder',
    description: 'An easy way to record screen!',
    background_color: '#131313',
    theme_color: '#131313',
    orientation: 'portrait' as 'portrait',
    display: 'standalone',
    start_url: '.',
    icons: generateIconSources('icons/icon'),
  };
  return manifest;
}
