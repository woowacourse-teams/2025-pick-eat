import Button from '@components/actions/Button';
import Confetti from '@components/Confetti';

import { apiClient } from '@apis/apiClient';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

type RestaurantResponse = {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  distance: number;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
};

const MatchResult = () => {
  const roomCode = '42be1480-b8d7-4c3b-8c04-d66c2ed4b6e6';

  const [result, setResult] = useState<RestaurantResponse>();

  useEffect(() => {
    const fetchResult = async () => {
      const response = await apiClient.get<RestaurantResponse>(
        `/rooms/${roomCode}/result`,
        {
          'Content-Type': 'application/json',
        }
      );

      console.log(response);

      if (response) setResult(response);
    };

    fetchResult();
  }, []);

  return (
    <S.Container>
      <Confetti />
      <S.Result>
        <S.TitleContainer>
          <S.Title>결과</S.Title>
        </S.TitleContainer>
        {result && (
          <S.Restaurant>
            <S.Name>{result.name}</S.Name>
          </S.Restaurant>
        )}

        <S.ButtonContainer>
          <Button color="primary" text="길 찾기" />
        </S.ButtonContainer>
      </S.Result>
    </S.Container>
  );
};

export default MatchResult;

const S = {
  Container: styled.div`
    height: calc(100vh - 72px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Result: styled.div`
    width: 50%;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    background-color: ${({ theme }) => theme.PALLETE.gray[5]};
  `,

  ButtonContainer: styled.div`
    width: 200px;
  `,

  TitleContainer: styled.div``,

  Title: styled.p`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,

  Restaurant: styled.div``,

  Name: styled.p`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
};
