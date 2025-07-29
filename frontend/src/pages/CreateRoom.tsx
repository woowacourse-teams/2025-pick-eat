import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import Select from '@components/actions/Select';
import ErrorMessage from '@components/errors/ErrorMessage';

import { useCreateRoom } from '@domains/room/hooks/useCreateRoom';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';

const RADIUS_OPTIONS = [
  { value: '150', label: '150미터 이내' },
  { value: '300', label: '300미터 이내' },
  { value: '500', label: '500미터 이내' },
];

function CreateRoom() {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  }>();
  const { createRoom, error } = useCreateRoom();

  const submitRoomForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRoom(new FormData(e.currentTarget), selectedOption?.value);
  };

  return (
    <S.Container>
      <S.Wrapper onSubmit={submitRoomForm}>
        <S.Title>방 만들기</S.Title>
        <S.Description>
          이미 방이 존재한다면 초대 링크를 통해 입장하세요.
        </S.Description>

        <S.FormWrapper>
          <Input
            name="roomName"
            label="방 이름"
            placeholder="방 이름을 입력해주세요."
          />
          <S.LocationWrapper>
            <Input
              name="location"
              label="위치"
              placeholder="위치를 입력해주세요."
            />
            <Select.Bar
              label="반경"
              selectedValue={selectedOption?.label}
              onChange={option => setSelectedOption(option)}
            >
              {RADIUS_OPTIONS.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select.Bar>
          </S.LocationWrapper>
        </S.FormWrapper>

        <ErrorMessage message={error} />
        <Button text="방 생성" />
      </S.Wrapper>
    </S.Container>
  );
}

export default CreateRoom;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - 72px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Wrapper: styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    padding: 10%;

    border-radius: 30px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};

    ${setMobileStyle(css`
      width: 100%;
      box-shadow: none;
    `)}
  `,

  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,

  FormWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;

    padding-top: 20px;
  `,

  LocationWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: 20px;

    ${setMobileStyle(css`
      flex-direction: column;
      gap: 30px;
    `)}
  `,

  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    white-space: nowrap;
  `,
};
