const KAKAO_REST_API_KEY = process.env.KAKAO_API_KEY;
const KAKAO_BASE_URL = 'https://dapi.kakao.com/v2/local';

export type AddressType = {
  addressName: string;
  placeName: string;
};

type DocumentType = {
  place_name: string;
  distance: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  id: string;
  phone: string;
  category_group_code: string;
  category_group_name: string;
  x: string;
  y: string;
};

export const getAddressByKeyword = async (keyword: string) => {
  const url = `${KAKAO_BASE_URL}/search/keyword.json?query=${keyword}`;

  const headers = {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.documents.length > 0) {
      return data.documents.map((doc: DocumentType) => {
        return {
          placeName: doc.place_name,
          addressName: doc.address_name,
        };
      });
    }
  } catch {
    return null;
  }
};

export const getLatLngByAddress = async (
  address: string
): Promise<{ x: number; y: number } | null> => {
  const url = `${KAKAO_BASE_URL}/search/keyword.json?query=${address}`;

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

export const getAddressByLatLng = async (
  x: number,
  y: number
): Promise<string | null> => {
  const url = `${KAKAO_BASE_URL}/geo/coord2address.json?x=${x}&y=${y}`;
  const headers = {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.documents.length > 0) {
      const address = data.documents[0].address;
      return address?.address_name ?? null;
    } else {
      console.log('주소 없음');
      return null;
    }
  } catch (error) {
    console.error('역지오코딩 오류:', error);
    return null;
  }
};
