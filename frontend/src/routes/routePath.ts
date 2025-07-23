export const ROUTE_PATH = {
  HOME: '/',
  ROOM_DETAIL: '/room-detail',
  PREFER_RESTAURANT: '/prefer-restaurant',
  MATCH_RESULT: '/match-result',
  RESTAURANTS_EXCLUDE: '/restaurants-exclude',
};

export const generateRouterPath = {
  roomDetail: (roomCode: string) =>
    `${ROUTE_PATH.ROOM_DETAIL}?code=${roomCode}`,
  restaurantsExclude: (roomCode: string) =>
    `${ROUTE_PATH.RESTAURANTS_EXCLUDE}?code=${roomCode}`,
}