import fs from 'fs';
import path from 'path';

import fg from 'fast-glob';
import subsetFont from 'subset-font';

const SRC_DIR = './src';
const GLOB = '**/*.tsx';
const FONT_PATH = './public/fonts/BMKkubulim.woff2';
const OUT_PATH = './public/fonts/BMKkubulim-subset.woff2';

const TAG =
  /<\s*([\w$.:-]*StaticKkubulim[\w$.:-]*)(?=[\s/>])[^>]*>([\s\S]*?)<\/\s*\1\s*>/g;

function extractTextFromCode(code) {
  const blocks = code.matchAll(TAG);

  let acc = '';
  for (const m of blocks) {
    const inner = m[2]
      .replace(/<[^>]+>/g, '')
      .replace(/\{[^}]*\}/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (inner) acc += inner + ' ';
  }
  return acc;
}

async function collectText() {
  const files = await fg(GLOB, {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/*.d.ts'],
  });

  let all = '';
  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    all += extractTextFromCode(code) + ' ';
  }

  const normalized = all.normalize('NFC');
  return normalized;
}

async function buildSubset() {
  const fontData = fs.readFileSync(FONT_PATH);

  const text = await collectText();
  console.log(`총${text.length}자`, text);

  const subset = await subsetFont(fontData, text, { targetFormat: 'woff2' });

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, subset);

  console.log(`생성 완료💖`);
}

buildSubset().catch(err => {
  console.error('생성 실패😣', err);
  process.exit(1);
});
