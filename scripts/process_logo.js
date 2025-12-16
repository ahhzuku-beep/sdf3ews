const sharp = require('sharp');
const fs = require('fs');
const inPath = 'resources/warboy.png';
const outPath = 'resources/warboy_flat.png';

if (!fs.existsSync(inPath)) {
  console.error('Input file not found:', inPath);
  process.exit(2);
}

(async () => {
  try {
    const meta = await sharp(inPath).metadata();
    const w = meta.width || 800;
    const h = meta.height || 800;
    const pad = Math.round(Math.min(w, h) * 0.08);
    const outW = w + pad * 2;
    const outH = h + pad * 2;

    await sharp({
      create: {
        width: outW,
        height: outH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      }
    })
      .composite([{ input: inPath, left: pad, top: pad }])
      .png()
      .toFile(outPath);

    console.log('Wrote', outPath);
  } catch (err) {
    console.error('Processing failed:', err);
    process.exit(1);
  }
})();
