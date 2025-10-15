import LineInput from '@components/actions/Input/LineInput';
import NewButton from '@components/actions/NewButton';
import ErrorMessage from '@components/errors/ErrorMessage';

import { useAuth } from '@domains/login/context/AuthProvider';

import { ApiError } from '@apis/apiClient';
import { login } from '@apis/login';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { sliceInputByMaxLength } from '@utils/sliceInputByMaxLength';
import { validate } from '@utils/validate';

import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const NICKNAME_MAX_LENGTH = 12;

function ProfileInit() {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.accessToken;
  const showToast = useShowToast();

  const buttonStatus = (): { message: string; disabled: boolean } => {
    if (validate.isEmpty(nickname))
      return { message: '닉네임을 입력해 주세요.', disabled: true };
    if (loading) return { message: '가입 중...', disabled: true };
    return { message: '회원가입 완료하기', disabled: false };
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(sliceInputByMaxLength(e.target.value, NICKNAME_MAX_LENGTH));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token: userToken } = await login.postSignUp({
        token,
        nickname,
      });

      loginUser(userToken);
      navigate(ROUTE_PATH.MAIN);
      showToast({ mode: 'SUCCESS', message: '회원가입이 완료되었습니다.' });
    } catch (e) {
      if (e instanceof ApiError && e.body) {
        const detail = typeof e.body.detail === 'string' ? e.body.detail : '';
        setError(detail);
      }

      showToast({ mode: 'ERROR', message: '회원가입에 실패하였습니다.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.TitleArea>
        <S.Title>회원가입</S.Title>
        <S.Description>닉네임을 정하고 회원가입을 완료하세요!</S.Description>
      </S.TitleArea>

      <S.InputArea onSubmit={handleSubmit}>
        <LineInput
          value={nickname}
          label="닉네임"
          placeholder="김픽잇"
          onChange={handleNicknameChange}
          xIcon
          onClear={() => setNickname('')}
          feedbackMessage={`${nickname.length}/${NICKNAME_MAX_LENGTH}`}
        />
        <ErrorMessage message={error} />
        <NewButton disabled={buttonStatus().disabled}>
          {buttonStatus().message}
        </NewButton>
      </S.InputArea>
    </S.Container>
  );
}

export default ProfileInit;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.GAP.level8};

    padding: 0 ${({ theme }) => theme.PADDING.p5};
  `,
  TitleArea: styled.div``,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[70]};
  `,
  InputArea: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
