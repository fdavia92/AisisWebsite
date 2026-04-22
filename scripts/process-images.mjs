import sharp from 'sharp';
import { readFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMAGENES = join(ROOT, 'Imagenes');
const OUT = join(ROOT, 'public', 'images');

const PRESETS = {
  hero:     { width: 1920, height: 1200, fit: 'cover', position: 'attention' },
  sections: { width: 1200, height: 1500, fit: 'cover', position: 'attention' },
  catalog:  { width: 1200, height: 1500, fit: 'cover', position: 'attention' },
};

async function exists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function processOne(group, entry) {
  const src = join(IMAGENES, entry.src);
  const okSrc = await exists(src);
  if (!okSrc) {
    console.warn(`[skip] source missing: ${entry.src}`);
    return;
  }
  const preset = PRESETS[group];
  const outDir = join(OUT, group);
  await mkdir(outDir, { recursive: true });

  const baseOut = join(outDir, entry.out);
  const pipeline = sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: preset.width, height: preset.height, fit: preset.fit, position: preset.position })
    .withMetadata({ orientation: undefined });

  await pipeline
    .clone()
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(`${baseOut}.jpg`);
  await pipeline
    .clone()
    .webp({ quality: 80, effort: 5 })
    .toFile(`${baseOut}.webp`);

  console.log(`[ok] ${group}/${entry.out}.{jpg,webp}`);
}

async function main() {
  const manifest = JSON.parse(await readFile(join(__dirname, 'image-manifest.json'), 'utf8'));
  for (const group of Object.keys(PRESETS)) {
    const entries = manifest[group] ?? [];
    for (const entry of entries) {
      await processOne(group, entry);
    }
  }
  console.log('done');
}

main().catch((e) => { console.error(e); process.exit(1); });
