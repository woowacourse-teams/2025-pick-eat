import PreferRestaurantList from '@domains/preferRestaurant/components/PreferRestaurantList';

import Button from '@components/actions/Button';

import { PreferRestaurantProvider } from '@domains/preferRestaurant/context/PreferRestaurantProvider';
import useParticipant from '@domains/preferRestaurant/hooks/useParticipant';

import { apiClient } from '@apis/apiClient';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

const PreferRestaurant = () => {
  const roomCode = '36f41043-01a3-401d-bdc6-e984b62722d3';

  const handleDeactivate = async () => {
    await apiClient.patch(`rooms/${roomCode}/deactivate`, undefined, {
      'Content-Type': 'application/json',
    });
  };
  const { participant } = useParticipant();

  return (
    <PreferRestaurantProvider>
      <S.Container>
        <S.TitleArea>
          <S.Title>선호도 조사</S.Title>
          <S.Description>선호 식당을 선택해 주세요.</S.Description>
          <S.ParticipantInfo>
            <S.Complited>
              완료자 {participant.eliminatedParticipants}/
              {participant.totalParticipants}
            </S.Complited>
          </S.ParticipantInfo>
        </S.TitleArea>

        <S.RestaurantListContainer>
          <PreferRestaurantList />
        </S.RestaurantListContainer>

        <S.Footer>
          <Button text="이전" color="gray" size="md" />
          <S.ButtonContainer>
            <Button
              text="조기 종료"
              color="gray"
              onClick={() => handleDeactivate()}
            />

            <S.ResultButtonContainer>
              <Button text="결과 보기" color="secondary" size="md" />
            </S.ResultButtonContainer>
          </S.ButtonContainer>
        </S.Footer>
      </S.Container>
    </PreferRestaurantProvider>
  );
};

export default PreferRestaurant;

const S = {
  Container: styled.div`
    height: calc(100vh - 72px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,

  TitleArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 20px 30px 0 30px;
  `,

  ParticipantInfo: styled.div`
    width: 100%;
    text-align: end;
  `,

  Complited: styled.p`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  RestaurantListContainer: styled.div`
    width: 100%;
    height: 78%;

    background-color: ${({ theme }) => theme.PALLETE.gray[5]};

    overflow-y: auto;
  `,

  Footer: styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;

    padding: 0 10px;
    border-top: 1px solid ${({ theme }) => theme.PALLETE.gray[20]};
  `,

  ButtonContainer: styled.div`
    width: 50%;
    display: flex;
    gap: 10px;
  `,

  ResultButtonContainer: styled.div`
    flex-grow: 1;
  `,

  Title: styled.p`
    color: ${({ theme }) => theme.PALLETE.secondary[60]};
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,

  Description: styled.p`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
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
    width: 150px;

    font: ${({ theme }) => theme.FONTS.body.large};
  `,

  Adress: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Distance: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
