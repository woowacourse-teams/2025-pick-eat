import LineInput from '@components/actions/Input/LineInput';
import NewButton from '@components/actions/NewButton';
import ErrorMessage from '@components/errors/ErrorMessage';
import SharePanel from '@components/share/SharePanel';

import { useAuth } from '@domains/login/context/AuthProvider';

import { PickeatType } from '@apis/pickeat';
import { usersQuery } from '@apis/users';

import { useGA } from '@hooks/useGA';

import { useShowToast } from '@provider/ToastProvider';

import { sliceInputByMaxLength } from '@utils/sliceInputByMaxLength';

import styled from '@emotion/styled';
import { FormEvent, use, useEffect, useState } from 'react';

import { useJoinPickeat } from '../hooks/useJoinPickeat';
import { makeNickname } from '../utils/makeNickname';

type Props = {
  pickeatData: Promise<PickeatType>;
};

const NICKNAME_MAX_LENGTH = 12;

function PickeatInfo({ pickeatData }: Props) {
  const pickeatDetail = use(pickeatData);
  const pickeatLink = window.location.href;
  const { data: users } = usersQuery.useGet();
  const defaultNickname = users.nickname ?? makeNickname();
  const [nickname, setNickname] = useState<string>(defaultNickname);

  const { loggedIn } = useAuth();
  const showToast = useShowToast();

  useEffect(() => {
    if (!loggedIn) return;
    // TODO : 현재는 일단 SuspenseQuery 에서 객체의 name 에 빈 문자열이
    // 에러토스트를 띄우고있는데, 이 부분을 에러바운더리 작업할 때 onError 에서
    // 렌더링할 때 toast 를 띄우는 방식으로 바꾸면 어떨까합니다.
    if (users.nickname === '')
      showToast({
        mode: 'ERROR',
        message: '닉네임을 불러오지 못해 랜덤 닉네임이 생성되었습니다.',
      });
  }, [loggedIn]);

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
