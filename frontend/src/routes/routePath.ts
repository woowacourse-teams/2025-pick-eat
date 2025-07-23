export const ROUTE_PATH = {
  HOME: '/',
  ROOM_DETAIL: '/room-detail',
  RESTAURANTS_EXCLUDE: '/restaurants-exclude',
};

export const generateRouterPath = {
  roomDetail: (roomCode: string) =>
    `${ROUTE_PATH.ROOM_DETAIL}?code=${roomCode}`,
  restaurantsExclude: (roomCode: string) =>
    `${ROUTE_PATH.RESTAURANTS_EXCLUDE}?code=${roomCode}`,
  PREFER_RESTAURANT: '/prefer-restaurant',
  MATCH_RESULT: '/match-result',
};
