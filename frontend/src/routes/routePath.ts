export const ROUTE_PATH = {
  MAIN: '/',
  PICKEAT_WITH_LOCATION: '/create-pickeat/location',
  PICKEAT_WITH_WISH: '/create-pickeat/wish',
  PICKEAT_DETAIL: '/pickeat-detail',
  PREFER_RESTAURANT: '/prefer-restaurant',
  MATCH_RESULT: '/match-result',
  RESTAURANTS_EXCLUDE: '/restaurants-exclude',
  LOGIN: '/login',
  PROFILE_INIT: '/profile-init',
  OAUTH_CALLBACK: '/oauth/callback',
  MY_PAGE: '/my-page',
  CREATE_ROOM: '/create-room',
  ROOM_DETAIL: '/room-detail',
};

export const generateRouterPath = {
  pickeatDetail: (pickeatCode: string) =>
    `${ROUTE_PATH.PICKEAT_DETAIL}?code=${pickeatCode}`,
  restaurantsExclude: (pickeatCode: string) =>
    `${ROUTE_PATH.RESTAURANTS_EXCLUDE}?code=${pickeatCode}`,
  preferRestaurant: (pickeatCode: string) =>
    `${ROUTE_PATH.PREFER_RESTAURANT}?code=${pickeatCode}`,
  matchResult: (pickeatCode: string) =>
    `${ROUTE_PATH.MATCH_RESULT}?code=${pickeatCode}`,
  roomDetail: (roomId: number, wishId: number) =>
    `${ROUTE_PATH.ROOM_DETAIL}?roomId=${roomId}&wishId=${wishId}`,
  pickeatWithLocation: (roomId: number) =>
    `${ROUTE_PATH.PICKEAT_WITH_LOCATION}?roomId=${roomId}`,
  pickeatWithWish: (roomId: number) =>
    `${ROUTE_PATH.PICKEAT_WITH_WISH}?roomId=${roomId}`,
};
