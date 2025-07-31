export const ROUTE_PATH = {
  HOME: '/',
  PICKEAT_DETAIL: '/pickeat-detail',
  PREFER_RESTAURANT: '/prefer-restaurant',
  MATCH_RESULT: '/match-result',
  RESTAURANTS_EXCLUDE: '/restaurants-exclude',
};

export const generateRouterPath = {
  pickeatDetail: (roomCode: string) =>
    `${ROUTE_PATH.PICKEAT_DETAIL}?code=${roomCode}`,
  restaurantsExclude: (roomCode: string) =>
    `${ROUTE_PATH.RESTAURANTS_EXCLUDE}?code=${roomCode}`,
  preferRestaurant: (roomCode: string) =>
    `${ROUTE_PATH.PREFER_RESTAURANT}?code=${roomCode}`,
  matchResult: (roomCode: string) =>
    `${ROUTE_PATH.MATCH_RESULT}?code=${roomCode}`,
};
