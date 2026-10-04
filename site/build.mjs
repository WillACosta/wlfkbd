import { execFile } from 'node:child_process';
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const run = promisify(execFile);
const site = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(site, '..');
const output = path.join(site, 'dist');
const gallery = path.join(root, 'docs/gallery');
const photos = (await readdir(gallery)).filter((name) => /^IMG_\d+\.(jpe?g)$/i.test(name));

if (photos.length === 0) throw new Error('No photos found in docs/gallery');

const ordered = photos.sort();

const descriptions = {
  'IMG_1226.JPG': 'The finished split keyboard beside a trackpad on a dark desk',
  'IMG_1212.JPG': 'The finished keyboard on a desk beside an hourglass',
  'IMG_1219.JPG': 'The two keyboard halves photographed at an angle on a wooden desk',
  'IMG_1196.JPG': 'Detail of the keycaps and engraved bottom plate',
  'IMG_1124.JPG': 'The two halves of The Wolf in front of a laptop',
  'IMG_1203.JPG': 'Close view of the engraved Wolf bottom plate',
  'IMG_1224.JPG': 'The Wolf on a desk with purple ambient light',
  'IMG_1093.JPG': 'A low angle view of the slim keyboard case',
  'IMG_1213.JPG': 'Both keyboard halves arranged on a wooden desk',
  'IMG_1114.JPG': 'One keyboard half beside a trackpad',
  'IMG_1223.JPG': 'The Wolf in a complete desk setup',
  'IMG_1097.JPEG': 'The slim keyboard case seen beside a laptop',
};

function description(name) {
  if (descriptions[name]) return descriptions[name];
  const number = Number(name.match(/\d+/)[0]);
  if (number < 1080) return 'Case and PCB parts during The Wolf build';
  if (number < 1120) return 'Assembled keyboard during an early build study';
  if (number < 1200) return 'The Wolf keyboard in a workspace';
  return 'Finished Wolf keyboard and its details';
}

function escapeHTML(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, 'gallery'), { recursive: true });
await copyFile(path.join(site, 'styles.css'), path.join(output, 'styles.css'));
await copyFile(path.join(site, 'main.js'), path.join(output, 'main.js'));
await copyFile(path.join(root, 'firmware/keymap-drawer/wlf.svg'), path.join(output, 'keymap.svg'));
await writeFile(path.join(output, '.nojekyll'), '');

// Four workers keep the build quick without exhausting the Pages runner.
let next = 0;
await Promise.all(Array.from({ length: Math.min(4, ordered.length) }, async () => {
  while (next < ordered.length) {
    const name = ordered[next++];
    const destination = path.join(output, 'gallery', `${path.parse(name).name}.jpg`);
    await run('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', path.join(gallery, name),
      '-vf', 'scale=1600:1600:force_original_aspect_ratio=decrease:force_divisible_by=2',
      '-q:v', '5', '-frames:v', '1', '-update', '1', destination,
    ]);
  }
}));

const cards = ordered.map((name, index) => {
  const src = `gallery/${path.parse(name).name}.jpg`;
  const alt = escapeHTML(description(name));
  const number = String(index + 1).padStart(2, '0');
  return `<button class="gallery-card" type="button" data-photo="${index}" aria-label="View photo ${number}: ${alt}">
    <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
    <span class="gallery-card__number" aria-hidden="true">${number} / ${String(ordered.length).padStart(2, '0')}</span>
  </button>`;
}).join('\n');

const template = await readFile(path.join(site, 'index.html'), 'utf8');
const page = template
  .replaceAll('{{PHOTO_COUNT}}', String(ordered.length))
  .replace('{{GALLERY_CARDS}}', cards);
await writeFile(path.join(output, 'index.html'), page);
console.log(`Built site with ${ordered.length} gallery photos at ${output}`);
