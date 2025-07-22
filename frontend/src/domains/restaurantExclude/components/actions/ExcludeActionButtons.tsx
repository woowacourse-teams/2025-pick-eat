import Button from '@components/actions/Button';

import styled from '@emotion/styled';

import ExcludeSubmitButton from './ExcludeSubmitButton';

function ExcludeActionButtons() {
  return (
    <S.ButtonBox>
      <Button
        text="이전"
        color="gray"
        size="md"
        leftIcon="./images/arrow.svg"
      />
      <S.RightButtonWrapper>
        <S.RightButtonBox>
          <Button
            text="건너뛰기"
            color="gray"
            rightIcon="./images/double-arrow.svg"
          />
        </S.RightButtonBox>

        <ExcludeSubmitButton />
      </S.RightButtonWrapper>
    </S.ButtonBox>
  );
}

export default ExcludeActionButtons;

const S = {
  ButtonBox: styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    justify-content: space-between;

    align-items: center;

    padding: 0 ${({ theme }) => theme.PADDING.px3};
  `,
  RightButtonWrapper: styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: 0 ${({ theme }) => theme.PADDING.px5};
  `,
  RightButtonBox: styled.div`
    flex-grow: 1;
  `,
};
