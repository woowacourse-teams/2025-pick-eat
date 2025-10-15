import Card from '@domains/login/components/Card';

import { HEADER_HEIGHT } from '@widgets/Header';

import KakaoLoginButton from '@components/actions/KakaoLoginButton';
import Carousel from '@components/Carousel';

import { ROUTE_PATH } from '@routes/routePath';

import { createQueryStrings } from '@utils/createUrl';

import styled from '@emotion/styled';

const kauthUrl = 'https://kauth.kakao.com/oauth/authorize';
const REST_API_KEY = process.env.REST_API_KEY as string;
const baseRedirectUrl = process.env.BASE_URL as string;
const redirectPath = ROUTE_PATH.OAUTH_CALLBACK.replace(/^\//, '');

const LOGIN_CONTENT = [
  {
    id: 1,
    title: '식당 즐겨찾기',
    description: '원하는 식당 중에서\n투표를 열어보세요!',
    imgUrl: './images/carousel/favoriteMan.png',
  },
  {
    id: 2,
    title: '방 만들기',
    description: '꾸준히 함께할 멤버와 더 빠르게\n투표를 열어보세요!',
    imgUrl: './images/carousel/friendsMan.png',
  },
  {
    id: 3,
    title: '빠른 재입장',
    description: '참여 중인 투표에 쉽게\n다시 입장할 수 있어요!',
    imgUrl: './images/carousel/exitMan.png',
  },
];

const CARD_CONTENT = LOGIN_CONTENT.map(item => (
  <Card
    id={item.id}
    key={item.id}
    title={item.title}
    imgUrl={item.imgUrl}
    description={item.description}
  />
));

function Login() {
  const handleKakaoLoginClick = () => {
    const queryParams = createQueryStrings({
      response_type: 'code',
      client_id: REST_API_KEY,
      redirect_uri: `${baseRedirectUrl}${redirectPath}`,
    });

    window.location.href = `${kauthUrl}${queryParams}`;
  };

  return (
    <S.Container>
      <Carousel contentArr={CARD_CONTENT} />
      <KakaoLoginButton onClick={handleKakaoLoginClick} />
    </S.Container>
  );
}

export default Login;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level8};
  `,
};
