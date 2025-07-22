import PreferRestaurantList from '@domains/restaurant/components/PreferRestaurantList';

import Button from '@components/actions/Button';

import { apiClient } from '@apis/apiClient';
import { ParticipantsResponse } from '@apis/prefer';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

const PreferRestaurant = () => {
  const roomCode = '42be1480-b8d7-4c3b-8c04-d66c2ed4b6e6';

  const [participant, setParticipant] = useState<ParticipantsResponse>({
    totalParticipants: 0,
    completedParticipants: 0,
  });

  const handleDeactivate = async () => {
    await apiClient.patch(`rooms/${roomCode}/deactivate`, undefined, {
      'Content-Type': 'application/json',
    });
  };

  useEffect(() => {
    let isUnmounted = false;

    const fetchParticipantState = async () => {
      const response = await apiClient.get<ParticipantsResponse>(
        `rooms/${roomCode}/participants/state`
      );

      if (!isUnmounted && response) {
        setParticipant(response);
      }
    };

    fetchParticipantState();

    const intervalId = setInterval(fetchParticipantState, 10000);

    return () => {
      isUnmounted = true;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>선호도 조사</S.Title>
        <S.Description>선호 식당을 선택해 주세요.</S.Description>
      </S.TitleContainer>

      <S.ParticipantContainer>
        <S.Complited>
          완료자 {participant.completedParticipants}/
          {participant.totalParticipants}
        </S.Complited>
      </S.ParticipantContainer>

      <S.Middle>
        <PreferRestaurantList />
      </S.Middle>

      <S.Bottom>
        <Button text="이전" color="gray" size="md" />
        <S.ButtonContainer>
          <Button
            text="조기 종료"
            color="gray"
            onClick={() => handleDeactivate()}
          />
          <Button text="결과 보기" color="secondary" size="md" />
        </S.ButtonContainer>
      </S.Bottom>
    </S.Container>
  );
};

export default PreferRestaurant;

const S = {
  Container: styled.div`
    height: calc(100vh - 72px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `,

  TitleContainer: styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
  `,

  ParticipantContainer: styled.div`
    width: 100%;
    padding-right: 30px;
    text-align: end;
  `,

  Complited: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
    color: ${({ theme }) => theme.PALLETE.gray[60]};
  `,

  Middle: styled.div`
    width: 95%;
    height: 78%;
    background-color: ${({ theme }) => theme.PALLETE.gray[5]};

    overflow-y: auto;
  `,

  Bottom: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
    position: sticky;
    border-top: 1px solid ${({ theme }) => theme.PALLETE.gray[20]};
    padding: 0 10px;
  `,

  ButtonContainer: styled.div`
    width: 50%;
    display: flex;
    gap: 10px;
  `,

  Title: styled.p`
    font: ${({ theme }) => theme.FONTS.heading.large};
    color: ${({ theme }) => theme.PALLETE.secondary[60]};
  `,

  Description: styled.p`
    font: ${({ theme }) => theme.FONTS.body.small};
    color: ${({ theme }) => theme.PALLETE.gray[60]};
  `,

  Restaurants: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Restaurant: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  RestaurantName: styled.p`
    font: ${({ theme }) => theme.FONTS.body.large};
    width: 150px;
  `,

  Adress: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Distance: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
