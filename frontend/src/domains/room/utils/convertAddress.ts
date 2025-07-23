const KAKAO_REST_API_KEY = process.env.KAKAO_API_KEY;
const KAKAO_BASE_URL = 'https://dapi.kakao.com/v2/local';

export const getLatLngByAddress = async (
  address: string
): Promise<{ x: number; y: number } | null> => {
  const url = `${KAKAO_BASE_URL}/search/keyword.json?query=${encodeURIComponent(address)}`;
  const headers = {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.documents.length > 0) {
      const { x, y } = data.documents[0];
      return { x: parseFloat(x), y: parseFloat(y) };
    } else {
      return null;
    }
  } catch (error) {
    console.error('API 오류:', error);
    return null;
  }
};
