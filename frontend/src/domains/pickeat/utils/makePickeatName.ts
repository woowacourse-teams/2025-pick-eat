const formatYYMMDD = (date: Date) => {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const yy = String(kst.getUTCFullYear()).slice(-2);
  const mm = String(kst.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(kst.getUTCDate()).padStart(2, '0');

  return yy + mm + dd;
};

const getHour = (d: Date) => (d.getUTCHours() + 9) % 24;

const getMealLabel = (hour: number) => {
  if (hour >= 22 || hour < 3) return '야식';
  if (hour < 10) return '아침';
  if (hour < 15) return '점심';
  return '저녁';
};

export const makePickeatName = (now: Date = new Date()) => {
  const hour = getHour(now);
  const meal = getMealLabel(hour);
  const yymmdd = formatYYMMDD(now);

  return `${yymmdd} 맛있는 ${meal} 고르기`;
};
