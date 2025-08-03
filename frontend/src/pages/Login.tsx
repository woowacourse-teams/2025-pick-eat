import KakaoLoginButton from "@components/actions/KakaoLoginButton";
import { HEADER_HEIGHT } from "@components/layouts/Header";

import styled from "@emotion/styled";

function Login() {
    return (
        <S.Container>
            <S.Title><S.TitleWrapper>로그인하고 <S.Point>더 빠르게</S.Point></S.TitleWrapper>식당을 정해보아요</S.Title>
            <KakaoLoginButton />
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