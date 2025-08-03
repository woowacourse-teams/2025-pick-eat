export const ROUTE_PATH = {
  HOME: '/',
  PICKEAT_DETAIL: '/pickeat-detail',
  PREFER_RESTAURANT: '/prefer-restaurant',
  MATCH_RESULT: '/match-result',
  RESTAURANTS_EXCLUDE: '/restaurants-exclude',
  LOGIN: '/login',
  QUICK_SIGNUP: '/quick-signup',
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
};
