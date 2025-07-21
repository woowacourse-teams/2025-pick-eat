import RestaurantList from '@domains/restaurant/components/RestaurantList';

export const restaurantListData = [
  {
    id: '1',
    name: '맛있는 한식당',
    category: '한식',
    link: 'https://example.com/restaurant1',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    id: '2',
    name: '피양콩할마니 본점',
    category: '콩국수',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
  {
    id: '3',
    name: '강강술래 잠실점',
    category: '소갈비',
    link: 'https://example.com/restaurant1',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    id: '4',
    name: '이태리 부대찌개 잠실점',
    category: '찌개',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
  {
    id: '5',
    name: '놀부부대찌개 송파점',
    category: '한식',
    link: 'https://example.com/restaurant1',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    id: '6',
    name: '육회바른연어 잠실점',
    category: '고기',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
];

// 일식 (Japan)
export const restaurantListDataJp = [
  {
    id: '101',
    name: '스시마을 신사점',
    category: '스시',
    link: 'https://example.com/restaurant3',
    distance: 450,
    roadAddressName: '서울시 서초구 반포동 11-22',
  },
  {
    id: '102',
    name: '라멘짱 강남점',
    category: '라멘',
    link: 'https://example.com/restaurant4',
    distance: 350,
    roadAddressName: '서울시 강남구 삼성동 33-44',
  },
  {
    id: '103',
    name: '이자카야 카이',
    category: '이자카야',
    link: 'https://example.com/restaurant5',
    distance: 520,
    roadAddressName: '서울시 송파구 문정동 55-66',
  },
];

// 중식 (China)
export const restaurantListDataCn = [
  {
    id: '201',
    name: '홍반장 짜장면',
    category: '짜장면',
    link: 'https://example.com/restaurant6',
    distance: 380,
    roadAddressName: '서울시 마포구 합정동 77-88',
  },
  {
    id: '202',
    name: '마라향기',
    category: '마라탕',
    link: 'https://example.com/restaurant7',
    distance: 470,
    roadAddressName: '서울시 강서구 화곡동 99-00',
  },
  {
    id: '203',
    name: '동방삭 양꼬치',
    category: '양꼬치',
    link: 'https://example.com/restaurant8',
    distance: 320,
    roadAddressName: '서울시 노원구 중계동 10-12',
  },
  {
    id: '204',
    name: '금룡 중화요리',
    category: '중식',
    link: 'https://example.com/restaurant9',
    distance: 410,
    roadAddressName: '서울시 종로구 청운동 13-24',
  },
];

// 양식 (Western)
export const restaurantListDataWest = [
  {
    id: '301',
    name: '알프레도 파스타하우스',
    category: '파스타',
    link: 'https://example.com/restaurant10',
    distance: 390,
    roadAddressName: '서울시 용산구 한남동 50-60',
  },
  {
    id: '302',
    name: '스테이크팩토리',
    category: '스테이크',
    link: 'https://example.com/restaurant11',
    distance: 500,
    roadAddressName: '서울시 성동구 성수동1가 70-80',
  },
  {
    id: '303',
    name: '올리브피자',
    category: '피자',
    link: 'https://example.com/restaurant12',
    distance: 420,
    roadAddressName: '서울시 서대문구 연희동 21-11',
  },
];

// 기타 (분식, 패스트푸드 등)
export const restaurantListDataEtc = [
  {
    id: '401',
    name: '김떡순 분식',
    category: '분식',
    link: 'https://example.com/restaurant13',
    distance: 290,
    roadAddressName: '서울시 관악구 신림동 17-75',
  },
  {
    id: '402',
    name: '버거킹 서울역점',
    category: '패스트푸드',
    link: 'https://example.com/restaurant14',
    distance: 350,
    roadAddressName: '서울시 중구 남대문로 3가 1-2',
  },
  {
    id: '403',
    name: '도토리떡카페',
    category: '카페',
    link: 'https://example.com/restaurant15',
    distance: 670,
    roadAddressName: '서울시 강동구 둔촌동 22-34',
  },
  {
    id: '404',
    name: '청춘닭강정',
    category: '닭강정',
    link: 'https://example.com/restaurant16',
    distance: 250,
    roadAddressName: '서울시 은평구 구산동 98-67',
  },
];

export const tabData = [
  {
    tab: '한식',
    content: <RestaurantList restaurantList={restaurantListData} />,
  },
  {
    tab: '중식',
    content: <RestaurantList restaurantList={restaurantListDataCn} />,
  },
  {
    tab: '일식',
    content: <RestaurantList restaurantList={restaurantListDataJp} />,
  },
  {
    tab: '양식',
    content: <RestaurantList restaurantList={restaurantListDataWest} />,
  },
  {
    tab: '기타',
    content: <RestaurantList restaurantList={restaurantListDataEtc} />,
  },
];
