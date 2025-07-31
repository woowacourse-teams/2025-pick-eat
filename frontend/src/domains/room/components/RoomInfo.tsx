import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import Arrow from '@components/assets/icons/Arrow';
import Location from '@components/assets/icons/Location';
import Share from '@components/assets/icons/Share';
import ErrorMessage from '@components/errors/ErrorMessage';

import { RoomDetailType } from '@apis/room';

import { ROUTE_PATH } from '@routes/routePath';

import { copyLink } from '@utils/copyLink';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FormEvent, use } from 'react';
import { useNavigate } from 'react-router';

import { useRoomDetail } from '../hooks/useRoomDetail';
import { makeNickName } from '../utils/makeNickName';

function RoomInfo({ roomData }: { roomData: Promise<RoomDetailType> }) {
  const roomDetail = use(roomData);
  const roomLink = `${process.env.BASE_URL}room-detail?code=${roomDetail.code}`;
  const navigate = useNavigate();

  const { joinRoom, error } = useRoomDetail(roomDetail);

  const submitJoinRoomForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nickName = formData.get('nickName') as string;
    joinRoom(nickName);
  };
  return (
    <S.Wrapper onSubmit={submitJoinRoomForm}>
      <S.ArrowButton type="button" onClick={() => navigate(ROUTE_PATH.HOME)}>
        <Arrow size="lg" direction="left" />
      </S.ArrowButton>
      <S.RoomName>{roomDetail.name}</S.RoomName>

      <S.LocationInfo>
        <S.TitleWrapper>
          <Location size="sm" />
          위치정보
        </S.TitleWrapper>

        <S.Location>설정 위치: {roomDetail.location} </S.Location>
        <S.Radius>반경: {roomDetail.radius}미터 이내</S.Radius>
      </S.LocationInfo>

      <Button
        type="button"
        leftIcon={<Share size="sm" />}
        text="링크공유"
        color="secondary"
        onClick={() => copyLink(roomLink)}
      />
      <S.FormWrapper>
        <Input
          defaultValue={makeNickName()}
          name="nickName"
          label="닉네임 입력"
          placeholder="사용하실 닉네임을 입력하세요."
        />
        <ErrorMessage message={error} />
        <Button text="입장" />
      </S.FormWrapper>
    </S.Wrapper>
  );
}

export default RoomInfo;

const S = {
  Wrapper: styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;

    gap: 30px;
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p11};

    border-radius: 30px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};

    ${setMobileStyle(css`
      width: 100%;
      box-shadow: none;
    `)}
  `,

  ArrowButton: styled.button`
    position: absolute;
    top: 30px;
    left: 20px;

    ${setMobileStyle(css`
      display: none;
    `)}
  `,

  RoomName: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.large};
    text-align: center;
  `,

  LocationInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    padding: 5%;

    border: 2px solid ${({ theme }) => theme.PALETTE.secondary[30]};
    border-radius: 10px;
  `,

  TitleWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
  `,

  Location: styled.span``,
  Radius: styled.span``,
  FormWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `,
};
