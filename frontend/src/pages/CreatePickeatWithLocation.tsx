import AddressList from '@domains/pickeat/components/AddressList';

import Button from '@components/actions/Button';
import Input from '@components/actions/Input/Input';
import SearchBar from '@components/actions/SearchBar/SearchBar';
import Select from '@components/actions/Select';
import ErrorMessage from '@components/errors/ErrorMessage';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import { useCreateLocationPickeat } from '@domains/pickeat/hooks/useCreateLocationPickeat';
import { useFindAddress } from '@domains/pickeat/hooks/useFindAddress';
import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { useGA } from '@hooks/useGA';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';

const RADIUS_OPTIONS = [
  { value: '150', label: '5분 이내' },
  { value: '300', label: '10분 이내' },
  { value: '500', label: '15분 이내' },
];

function CreatePickeatWithLocation() {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  }>();
  const { address, handleInputChange, addressList, handleAddressClick } =
    useFindAddress();
  const { createPickeat, error } = useCreateLocationPickeat();

  const submitPickeatForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPickeat(new FormData(e.currentTarget), selectedOption?.value);
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'form_button',
      label: '픽잇 생성 버튼',
      value: 1,
    });
  };

  return (
    <S.Container>
      <S.Wrapper onSubmit={submitPickeatForm}>
        <S.Title>
          함께 식사할 멤버를 소환하고,
          <br /> 식당을 정해봐요.
        </S.Title>
        <S.Description>
          이미 투표가 존재한다면 초대 링크를 통해 입장하세요.
        </S.Description>

        <S.FormWrapper>
          <Input
            name="pickeatName"
            label="투표명"
            placeholder="레전드 점심"
            defaultValue={makePickeatName()}
          />

          <SearchBar
            value={address}
            onChange={e => handleInputChange(e.target.value)}
            name="address"
            label="식당 탐색 위치"
            placeholder="식당 탐색 위치 검색"
          >
            {addressList && (
              <AddressList
                addressList={addressList}
                onClick={handleAddressClick}
              />
            )}
          </SearchBar>

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
        </S.FormWrapper>

        <ErrorMessage message={error} />
        <Button text="시작하기" />
      </S.Wrapper>
    </S.Container>
  );
}

export default CreatePickeatWithLocation;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - ${HEADER_HEIGHT});
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Wrapper: styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: ${({ theme }) => theme.PADDING.p10};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};

    ${setMobileStyle(css`
      width: 100%;
      box-shadow: none;
    `)}
  `,

  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,

  FormWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level8};

    padding-top: ${({ theme }) => theme.PADDING.p6};
  `,

  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    white-space: nowrap;
  `,
};
