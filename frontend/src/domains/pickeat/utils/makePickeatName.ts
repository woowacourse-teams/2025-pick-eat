const KST = 'Asia/Seoul';

const formatYYMMDDKST = (d: Date) => {
  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: KST,
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d);

  const yy = parts.find(p => p.type === 'year')!.value;
  const mm = parts.find(p => p.type === 'month')!.value;
  const dd = parts.find(p => p.type === 'day')!.value;
  return `${yy}${mm}${dd}`;
};

const getHourKST = (d: Date) => {
  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: KST,
    hour: '2-digit',
    hour12: false,
  }).formatToParts(d);

  return parseInt(parts.find(p => p.type === 'hour')!.value, 10);
};

const getMealLabel = (hour: number) => {
  if (hour >= 22 || hour < 3) return '야식';
  if (hour < 10) return '아침';
  if (hour < 15) return '점심';
  return '저녁';
};

export const makePickeatName = (now: Date = new Date()) => {
  const hour = getHourKST(now);
  const meal = getMealLabel(hour);
  const yymmdd = formatYYMMDDKST(now);
  return `${yymmdd} 맛있는 ${meal} 고르기`;
};
