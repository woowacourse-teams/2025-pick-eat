import fs from 'fs';
import path from 'path';

import fg from 'fast-glob';
import subsetFont from 'subset-font';

const SRC_DIR = './src';
const GLOB = '**/*.tsx';
const FONT_PATH = './tools/kkubulim/BMKkubulim.woff2';
const OUT_PATH = './public/fonts/BMKkubulim-subset.woff2';

// <PointText>...</PointText>와 같이 특정 컴포넌트 블록의 내부 텍스트만 추출하는 정규식
const TAG =
  /<\s*([\w$.:-]*PointText[\w$.:-]*)(?=[\s/>])[^>]*>([\s\S]*?)<\/\s*\1\s*>/g;

// 한 파일의 코드 문자열에서 PointText 내부의 순수 텍스트만 뽑아내는 함수
function extractTextFromCode(code) {
  const blocks = code.matchAll(TAG);
  const pieces = [];

  // 각 매치에서 두 번째 캡처 그룹(태그 내부 컨텐츠)만 추출
  for (const m of blocks) {
    const inner = m[2]
      // HTML 태그 제거 (예: <b>굵게</b> → 굵게)
      .replace(/<[^>]+>/g, '');
    // JSX 중괄호 표현식 제거 (예: {hi})

    if (inner) pieces.push(inner);
  }

  return pieces.join(' ');
}

// 이모지 제거(BM Kkubulim은 이모지 거의 지원x)
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
  // 각 파일을 읽어서 PointText 내부 텍스트만 추출
  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const extracted = extractTextFromCode(code);
    if (extracted) texts.push(extracted);
  }

  // 모든 파일에서 모은 텍스트를 합치고 유니코드 정규화(NFC)
  let allText = texts.join(' ').normalize('NFC');

  allText = removeEmojis(allText);
  allText = allText.replace(/&nbsp;/g, '');

  // Set으로 중복 문자 제거 → 배열로 변환 → 다시 문자열로
  //  - subset-font에서 중복을 제거해주긴 하지만 콘솔에 결과를 확인해 보고 싶어서!
  return Array.from(new Set(allText)).join('');
}

async function buildSubset() {
  // 원본 폰트를 메모리로 로드 (Buffer)
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
