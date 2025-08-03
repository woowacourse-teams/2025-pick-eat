import KakaoLoginButton from "@components/actions/KakaoLoginButton";
import { HEADER_HEIGHT } from "@components/layouts/Header";

import styled from "@emotion/styled";

// TODO : 추후 .env 에 있는 슬링키한테 받은 REST API 키로 연결해둘것임
const REST_API_KEY = process.env.KAKAO_API_KEY;

// TODO : 최초 로그인 시 닉네임 리다이렉트, 닉네임있으면 메인으로 리다이렉트

const kauthUrl = 'https://kauth.kakao.com/oauth/authorize?response_type=code&';

const baseRedirectUrl = process.env.BASE_URL;
const redirectPath = 'oauth/callback';

function Login() {
    const handleKakaoLoginCLick = () => {
        window.location.href = `${kauthUrl}client_id=${REST_API_KEY}&redirect_uri=${baseRedirectUrl}${redirectPath}`;
    }
    return (
        <S.Container>
            <S.Title><S.TitleWrapper>로그인하고 <S.Point>더 빠르게</S.Point></S.TitleWrapper>식당을 정해보아요</S.Title>
            <KakaoLoginButton onClick={handleKakaoLoginCLick} />
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
    Title: styled.h1`
        color: ${({ theme }) => theme.PALETTE.gray[60]};
        font: ${({ theme }) => theme.FONTS.heading.large};
    `,
    Point: styled.h1`
        color: ${({ theme }) => theme.PALETTE.primary[50]};
        font: ${({ theme }) => theme.FONTS.heading.large_style};
    `,
    TitleWrapper: styled.div`
        
    `,
}