import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import ErrorMessage from '@components/errors/ErrorMessage';
import SharePanel from '@components/share/SharePanel';

import { PickeatType } from '@apis/pickeat';

import { useGA } from '@hooks/useGA';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FormEvent, use, useState } from 'react';

import { useJoinPickeat } from '../hooks/useJoinPickeat';

type Props = {
  pickeatData: Promise<PickeatType>;
  defaultNickname: string;
};

const NICKNAME_MAX_LENGTH = 12;

function PickeatInfo({ pickeatData, defaultNickname }: Props) {
  const pickeatDetail = use(pickeatData);
  const pickeatLink = window.location.href;
  const [nickname, setNickname] = useState(defaultNickname);

  const { joinPickeat, error } = useJoinPickeat(pickeatDetail);

  const submitJoinPickeatForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinPickeat(nickname);
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'form_button',
      label: '픽잇 입장 버튼',
      value: 1,
    });
  };

  return (
    <S.Wrapper onSubmit={submitJoinPickeatForm}>
      <S.Title>
        함께 식사할 멤버를 소환하고
        <br /> 식당을 정해봐요.
      </S.Title>

      <S.ShareBox>
        <SharePanel
          title="멤버 초대하기"
          description={
            <p>
              QR코드나 링크 공유로
              <br />
              식사 멤버를 소환하고 식당을 투표해요
            </p>
          }
          url={pickeatLink}
        />
      </S.ShareBox>

      <S.FormWrapper>
        <Input
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          name="nickname"
          label="닉네임"
          placeholder="사용하실 닉네임을 입력하세요."
          maxLength={NICKNAME_MAX_LENGTH}
        />
        <S.CharacterCount>
          {nickname.length}/{NICKNAME_MAX_LENGTH}
        </S.CharacterCount>
        <ErrorMessage message={error} />

        <Button text="입장" />
      </S.FormWrapper>
    </S.Wrapper>
  );
}

export default PickeatInfo;

const S = {
  Wrapper: styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.GAP.level5};
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p5};

    ${setMobileStyle(css`
      width: 100%;
    `)}
  `,
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  ShareBox: styled.div`
    width: 260px;

    margin: auto;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 30px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level2};
  `,
  FormWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  CharacterCount: styled.div`
    color: ${({ theme }) => theme.PALETTE.gray[30]};

    font: ${({ theme }) => theme.FONTS.body.xsmall};
  `,
};
