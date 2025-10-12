import SearchAddress from '@domains/pickeat/components/SearchAddress';
import SearchLoadingOverlay from '@domains/pickeat/components/SearchLoadingOverlay';

import { HEADER_HEIGHT } from '@widgets/Header';

import NewButton from '@components/actions/NewButton';
import LineSearchBar from '@components/actions/SearchBar/LineSearchBar';
import Select from '@components/actions/Select';
import BottomSheet from '@components/BottomSheet';
import ErrorMessage from '@components/errors/ErrorMessage';
import { useModal } from '@components/modal/useModal';

import { useCreateLocationPickeat } from '@domains/pickeat/hooks/useCreateLocationPickeat';
import { ERROR_MESSAGE } from '@domains/pickeat/services/validatePickeatForms';
import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { useGA } from '@hooks/useGA';

import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';

const RADIUS_OPTIONS = [
  { value: '150', label: '5분 이내' },
  { value: '300', label: '10분 이내' },
  { value: '500', label: '15분 이내' },
];

function CreatePickeatWithLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [overayMessage, setOverayMessage] =
    useState('식당을 찾아보고 있어요 , ,');
  const { opened, handleOpenModal, handleCloseModal } = useModal({
    defaultOpened: true,
  });
  const [address, setAddress] = useState('');
  const handleAddressChange = (value: string) => {
    setAddress(value);
    handleCloseModal();
  };
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  }>({ value: RADIUS_OPTIONS[0].value, label: RADIUS_OPTIONS[0].label });
  const handleCloseOverlay = (callback: () => void) => {
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, 2000);
  };

  const { createPickeat, error } = useCreateLocationPickeat(handleCloseOverlay);

  const submitPickeatForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('pickeatName', makePickeatName());

    await createPickeat(formData, selectedOption.value);
    setOverayMessage('식당을 찾았어요 !');

    useGA().useGAEventTrigger({
      action: 'click',
      category: 'form_button',
      label: '픽잇 생성 버튼',
      value: 1,
    });
  };

  return (
    <>
      <S.Container>
        <S.Wrapper onSubmit={submitPickeatForm}>
          <S.Address>
            <S.SearchButton onClick={handleOpenModal} type="button">
              <LineSearchBar
                readOnly
                placeholder="강남역 2호선"
                value={address}
                name="address"
              />
            </S.SearchButton>
            <S.Text>근처의</S.Text>
          </S.Address>

          <S.Distance>
            <S.Text>도보 약</S.Text>
            <S.SelectWrapper>
              <Select.Bar
                selectedValue={selectedOption.label}
                onChange={option => setSelectedOption(option)}
              >
                {RADIUS_OPTIONS.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select.Bar>
            </S.SelectWrapper>
            <S.Text>식당을 중에서</S.Text>
          </S.Distance>

          <S.Description>
            <S.Text>투표를 열어볼까요?</S.Text>
          </S.Description>

          <ErrorMessage message={error} />

          <NewButton fixed disabled={!address}>
            {address ? '투표 시작하기' : ERROR_MESSAGE.ADDRESS}
          </NewButton>
        </S.Wrapper>

        <BottomSheet opened={opened} onClose={handleCloseModal}>
          <SearchAddress onAddressClick={handleAddressChange} />
        </BottomSheet>
        <S.VotingBoxImage src={'/images/vote.png'} alt="투표함" />

        {isLoading && <SearchLoadingOverlay text={overayMessage} />}
      </S.Container>
    </>
  );
}

export default CreatePickeatWithLocation;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    padding: ${HEADER_HEIGHT} ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  Wrapper: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  Text: styled.span`
    font: ${({ theme }) => theme.FONTS.body.xlarge_bold};
  `,

  Address: styled.section`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  Distance: styled.section`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  Description: styled.span`
    padding: ${({ theme }) => theme.PADDING.p3} 0;
  `,

  SearchButton: styled.button`
    width: 168px;
    height: 34px;
  `,

  SelectWrapper: styled.div`
    width: 124px;
  `,

  VotingBoxImage: styled.img`
    width: 244px;

    margin: 0 auto;
  `,
};
