import LineInput from '@components/actions/Input/LineInput';
import NewButton from '@components/actions/NewButton';
import ErrorMessage from '@components/errors/ErrorMessage';
import SharePanel from '@components/share/SharePanel';

import { PickeatType } from '@apis/pickeat';

import { useGA } from '@hooks/useGA';

import { sliceInputByMaxLength } from '@utils/sliceInputByMaxLength';

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
    <S.Container>
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

      <S.FormWrapper onSubmit={submitJoinPickeatForm}>
        <LineInput
          value={nickname}
          onChange={e =>
            setNickname(
              sliceInputByMaxLength(e.target.value, NICKNAME_MAX_LENGTH)
            )
          }
          name="nickname"
          label="닉네임"
          placeholder="사용하실 닉네임을 입력하세요."
          feedbackMessage={`${nickname.length}/${NICKNAME_MAX_LENGTH}`}
          xIcon
          onClear={() => setNickname('')}
        />

        <ErrorMessage message={error} />

        <NewButton>투표 입장하기</NewButton>
      </S.FormWrapper>
    </S.Container>
  );
}

export default PickeatInfo;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};
  `,
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.body.xlarge_bold};
  `,
  ShareBox: styled.div`
    width: 260px;

    margin: auto;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level2};
  `,
  FormWrapper: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
};
