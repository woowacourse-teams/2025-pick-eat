import Button from "@components/actions/Button";
import Input from "@components/actions/Input";
import { HEADER_HEIGHT } from "@components/layouts/Header";

import styled from "@emotion/styled";

function QuickSignup() {
    // TODO : 닉네임 입력 후 가입하기 버튼 클릭 시, 서버에 닉네임 전송 및 회원가입 처리
    // TODO : 로그인 없이 해당 페이지 접속 불가 / 로그인 시에도 기존 닉네임이 있으면 해당 페이지 접속 불가
    return (
        <S.Container>
            <S.Title>닉네임을 짓고<br /> 가입을 완료하세요</S.Title>
            <S.Box>
                <Input label='닉네임' placeholder="김픽잇"/>
                <Button text="가입하기" />
            </S.Box>
        </S.Container>
    );
}

export default QuickSignup;

const S = {
    Container: styled.div`
        width: 100%;
        height: calc(100vh - ${HEADER_HEIGHT});
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: ${({ theme }) => theme.GAP.level8};

        padding: 0 ${({ theme }) => theme.PADDING.p8};
    `,
     Title: styled.h1`
        color: ${({ theme }) => theme.PALETTE.gray[60]};
        font: ${({ theme }) => theme.FONTS.heading.large};
    `,
    Box: styled.div`
        width: 100%;
        max-width: 340px;
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.GAP.level5};
    `
}