import fs from 'fs';
import path from 'path';

import fg from 'fast-glob';
import subsetFont from 'subset-font';

const SRC_DIR = './src';
const GLOB = '**/*.tsx';
const FONT_PATH = './tools/kkubulim/BMKkubulim.woff2';
const OUT_PATH = './public/fonts/BMKkubulim-subset.woff2';

const TAG =
  /<\s*([\w$.:-]*PointText[\w$.:-]*)(?=[\s/>])[^>]*>([\s\S]*?)<\/\s*\1\s*>/g;

function extractTextFromCode(code) {
  const blocks = code.matchAll(TAG);
  const pieces = [];

  for (const m of blocks) {
    const inner = m[2]
      .replace(/<[^>]+>/g, '')
      .replace(/\{[^}]*\}/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (inner) pieces.push(inner);
  }
  return pieces.join(' ');
}

const EMOJI_SEQUENCE =
  /\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?)*|\p{Emoji_Presentation}/gu;

function removeEmojis(str) {
  return str.replace(EMOJI_SEQUENCE, '');
}

async function collectText() {
  const files = await fg(GLOB, {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/*.d.ts'],
  });

  const texts = [];
  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const extracted = extractTextFromCode(code);
    if (extracted) texts.push(extracted);
  }

  let allText = texts.join(' ').normalize('NFC');
  allText = removeEmojis(allText);
  allText = allText.replace(/\s+/g, '');

  return Array.from(new Set(allText)).join('');
}

async function buildSubset() {
  const fontData = fs.readFileSync(FONT_PATH);

  const text = await collectText();
  console.log(`총 ${text.length}자`, text);

  const subset = await subsetFont(fontData, text, { targetFormat: 'woff2' });

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, subset);

  console.log(`생성 완료💖`);
}

buildSubset().catch(err => {
  console.error('생성 실패😣', err);
  process.exit(1);
});
