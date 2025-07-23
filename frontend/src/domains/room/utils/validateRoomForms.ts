type ValidateType = {
  name: string | undefined;
  location: string | undefined;
  radius: string | undefined;
};

const validateName = (name: string | undefined) => {
  if (!name) throw new Error('방 이름을 입력해주세요.');
};

const validateLocation = (location: string | undefined) => {
  if (!location) throw new Error('위치를 입력해주세요.');
};

const validateRadius = (radius: string | undefined) => {
  if (!radius) throw new Error('반경을 선택해주세요.');
};

export const validateRoomForms = ({ name, location, radius }: ValidateType) => {
  validateName(name);
  validateLocation(location);
  validateRadius(radius);
};
