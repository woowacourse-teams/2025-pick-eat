import RestaurantList from '@domains/restaurant/components/RestaurantList';

export const restaurantListData = [
  {
    name: '맛있는 한식당',
    category: '한식',
    link: 'https://example.com/restaurant1',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    name: '피양콩할마니 본점',
    category: '콩국수',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
  {
    name: '강강술래 잠실점',
    category: '소갈비',
    link: 'https://example.com/restaurant1',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    name: '이태리 부대찌개 잠실점',
    category: '찌개',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
  {
    name: '놀부부대찌개 송파점',
    category: '한식',
    link: 'https://example.com/restaurant1',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    name: '육회바른연어 잠실점',
    category: '고기',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
];

export const tabData = [
  {
    tab: '한식',
    content: <RestaurantList restaurantList={restaurantListData} />,
  },
  {
    tab: '중식',
    content: <RestaurantList restaurantList={restaurantListData} />,
  },
  {
    tab: '일식',
    content: <RestaurantList restaurantList={restaurantListData} />,
  },
  {
    tab: '양식',
    content: <RestaurantList restaurantList={restaurantListData} />,
  },
  {
    tab: '기타',
    content: <RestaurantList restaurantList={restaurantListData} />,
  },
];
