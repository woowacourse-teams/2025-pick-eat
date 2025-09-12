import PickeatInfo from '@domains/pickeat/components/PickeatInfo';

import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { useAuth } from '@domains/login/context/AuthProvider';
import { makeNickname } from '@domains/pickeat/utils/makeNickname';

import { pickeat } from '@apis/pickeat';
import { users } from '@apis/users';

import styled from '@emotion/styled';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

function PickeatDetail() {
  const [defaultNickname, setDefaultNickname] = useState(makeNickname);
  const [nicknameError, setNicknameError] = useState('');

  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) return;

    const getNickname = async () => {
      try {
        const user = await users.get();
        if (user) {
          setDefaultNickname(user.nickname);
        }
      } catch (e) {
        console.error(e);
        setNicknameError(
          '닉네임을 불러오지 못해 랜덤 닉네임이 생성되었습니다.'
        );
      }
    };

    getNickname();
  }, [loggedIn]);

  return (
    <S.Container>
      <ErrorBoundary>
        <Suspense>
          <PickeatInfo
            pickeatData={pickeat.get(pickeatCode)}
            defaultNickname={defaultNickname}
            nicknameError={nicknameError}
          />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}
export default PickeatDetail;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - ${HEADER_HEIGHT});
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
