import PickeatInfo from '@domains/pickeat/components/PickeatInfo';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { useAuth } from '@domains/login/context/AuthProvider';
import { makeNickname } from '@domains/pickeat/utils/makeNickname';

import { pickeat } from '@apis/pickeat';
import { users } from '@apis/users';

import { useShowToast } from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

function PickeatDetail() {
  const [defaultNickname, setDefaultNickname] = useState(makeNickname);
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const { loggedIn } = useAuth();
  const showToast = useShowToast();

  useEffect(() => {
    if (!loggedIn) return;

    const getNickname = async () => {
      try {
        const user = await users.get();
        if (user) {
          setDefaultNickname(user.nickname);
        }
      } catch {
        showToast({
          mode: 'ERROR',
          message: '닉네임을 불러오지 못해 랜덤 닉네임이 생성되었습니다.',
        });
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: ${({ theme }) => theme.LAYOUT.headerHeight};
  `,
};
