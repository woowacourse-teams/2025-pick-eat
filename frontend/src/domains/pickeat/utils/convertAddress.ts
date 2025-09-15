import { createQueryString, joinAsPath } from '@utils/createUrl';

export type AddressType = {
  id: string;
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

const kakaoApiClient = async (endPoint: string) => {
  const KAKAO_REST_API_KEY = process.env.KAKAO_API_KEY;
  const KAKAO_BASE_URL = 'https://dapi.kakao.com/v2/local/';

  try {
    const response = await fetch(`${KAKAO_BASE_URL}${endPoint}`, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });

    return await response.json();
  } catch {
    return null;
  }
};

export const getAddressListByKeyword = async (
  keyword: string
): Promise<AddressType[] | null> => {
  const url = joinAsPath('search', 'keyword.json');
  const queryString = createQueryString({ query: keyword });

  const data = await kakaoApiClient(`${url}${queryString}`);
  if (data?.documents.length > 0) {
    return data.documents.map((doc: DocumentType) => ({
      id: doc.id,
      placeName: doc.place_name,
      addressName: doc.address_name,
    }));
  }

  return [];
};

export const getLatLngByAddress = async (
  address: string
): Promise<{ x: number; y: number } | null> => {
  const url = joinAsPath('search', 'keyword.json');
  const queryString = createQueryString({ query: address });

  const data = await kakaoApiClient(`${url}${queryString}`);

  if (data?.documents.length > 0) {
    const { x, y } = data.documents[0];
    return { x: parseFloat(x), y: parseFloat(y) };
  } else {
    return null;
  }
};

export const getAddressByLatLng = async (
  x: number,
  y: number
): Promise<string | null> => {
  const url = joinAsPath('geo', 'coord2address.json');

  const data = await kakaoApiClient(`${url}?x=${x}&y=${y}`);
  if (data?.documents.length > 0) {
    const address = data.documents[0].address;
    return address?.address_name ?? null;
  } else {
    console.log('주소 없음');
    return null;
  }
};

export const getFormDataByAddress = async (address: string) => {
  const url = joinAsPath('search', 'keyword.json');
  const queryString = createQueryString({ query: address });

  const data = await kakaoApiClient(`${url}${queryString}`);

  if (data && data.documents.length > 0) {
    return {
      name: data.documents[0].place_name,
      roadAddressName: data.documents[0].road_address_name,
      placeUrl: data.documents[0].place_url,
    };
  } else {
    return null;
  }
};
