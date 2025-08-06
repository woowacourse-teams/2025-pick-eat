import { NICKNAME_ADJECTIVES, NICKNAME_NOUNS } from '../constants/nickname';

export const makeNickName = () => {
  const randomAdjective = Math.floor(
    Math.random() * NICKNAME_ADJECTIVES.length
  );
  const randomNoun = Math.floor(Math.random() * NICKNAME_NOUNS.length);

  return `${NICKNAME_ADJECTIVES[randomAdjective]}${NICKNAME_NOUNS[randomNoun]}`;
};
