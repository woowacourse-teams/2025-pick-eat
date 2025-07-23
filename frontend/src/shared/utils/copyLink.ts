export const copyLink = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    alert('링크가 복사되었습니다!');
  } catch (e) {
    console.error(e);
    alert('복사에 실패했습니다.');
  }
};
