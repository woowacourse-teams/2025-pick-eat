import KakaoLogo from "@components/assets/icons/KakaoLogo";

import styled from "@emotion/styled";

const kakaoDesignGuide = {
    backgroundColor: "#FEE500",
    textColor: "#191919",
    borderRadius: "12px",
}

function KakaoLoginButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <S.Container {...props}>
            <KakaoLogo width={18} />
            카카오로 3초만에 로그인
        </S.Container>
    );
}

const S = {
    Container: styled.button`
        width: 248px;
        height: 48px;

        display: flex;
        justify-content: center;
        align-items: center;

        gap: ${({ theme }) => theme.GAP.level3};

        background-color: ${kakaoDesignGuide.backgroundColor};

        color: ${kakaoDesignGuide.textColor};

        font: ${({ theme }) => theme.FONTS.body.small_bold};
        border-radius: ${kakaoDesignGuide.borderRadius};
        cursor: pointer;

    `
}

export default KakaoLoginButton;