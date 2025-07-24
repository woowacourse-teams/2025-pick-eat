export type ParticipantsResponse = {
  totalParticipants: number;
  eliminatedParticipants: number;
};

export type RestaurantsResponse = {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  distance: number;
  placeUrl: string;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
};
