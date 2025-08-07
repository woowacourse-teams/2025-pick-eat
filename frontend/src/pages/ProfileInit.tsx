import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import { useAuth } from '@domains/login/context/AuthProvider';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

function ProfileInit() {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async () => {
    if (nickname.trim() === '') {
      setError('닉네임을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.API_BASE_URL}auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nickname }),
      });

      if (response.ok) {
        loginUser(token);
        navigate(ROUTE_PATH.HOME);
        alert('회원가입이 완료되었습니다.');
      } else {
        const data = await response.json();
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch {
      setError('서버와 연결할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>
        닉네임을 짓고
        <br /> 가입을 완료하세요
      </S.Title>
      <S.Box>
        <Input
          label="닉네임"
          placeholder="김픽잇"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <Button
          text={loading ? '가입 중...' : '가입하기'}
          onClick={handleSubmit}
          disabled={loading}
        />
        {error && <S.Error>{error}</S.Error>}
      </S.Box>
    </S.Container>
  );
}

export default ProfileInit;

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
  `,
  Error: styled.div`
    color: red;
    margin-top: 8px;
  `,
};
