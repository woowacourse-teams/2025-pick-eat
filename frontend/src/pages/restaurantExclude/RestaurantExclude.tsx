import Button from '@components/actions/Button';
import TabMenu from '@components/tabMenus/TabMenu';

import styled from '@emotion/styled';

import { tabData } from './RestaurantsMockData';

function RestaurantExclude() {
  return (
    <>
      <S.Container>
        <S.Title>오늘 안 땡기는 식당은?</S.Title>
        <S.Description>
          가고싶지 않은 식당을 X 버튼을 눌러 제외해주세요.
        </S.Description>
        <TabMenu tabData={tabData} />
      </S.Container>
      <S.Footer>
        <S.ButtonBox>
          <Button
            text="이전"
            color="gray"
            size="md"
            leftIcon="./images/arrow.svg"
          />
          <S.RightButtonWrapper>
            <Button
              text="건너뛰기"
              color="gray"
              rightIcon="./images/double-arrow.svg"
            />
            <Button text="다음" size="md" rightIcon="./images/arrow.svg" />
          </S.RightButtonWrapper>
        </S.ButtonBox>
      </S.Footer>
    </>
  );
}

export default RestaurantExclude;

const S = {
  Container: styled.div`
    padding: 16px;
  `,
  Title: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.large};
    color: ${({ theme }) => theme.PALLETE.primary[50]};
  `,
  Description: styled.p`
    font: ${({ theme }) => theme.FONTS.body.small};
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    margin-bottom: 32px;
  `,
  Footer: styled.footer`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.PALLETE.gray[0]};
    position: sticky;
    bottom: 0;
    border-top: 1px solid ${({ theme }) => theme.PALLETE.gray[20]};
    padding: 16px 0;
  `,
  ButtonBox: styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    justify-content: space-between;
    align-items: center;

    align-items: center;
    padding: 0 8px;
  `,
  RightButtonWrapper: styled.div`
    width: 50%;
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 0 16px;
  `,
};
