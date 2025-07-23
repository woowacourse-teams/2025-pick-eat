import ExcludeSubmitButton from '@domains/restaurantExclude/components/actions/ExcludeSubmitButton';

import Button from '@components/actions/Button';
import DoubleArrow from '@components/assets/icons/DoubleArrow';

import styled from '@emotion/styled';

function ExcludeActionButtons() {
  return (
    <S.ButtonBox>
      <S.RightButtonWrapper>
        <S.RightButtonBox>
          <Button
            text="건너뛰기"
            color="gray"
            rightIcon={
              <DoubleArrow size="sm" direction="right" color="black" />
            }
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
    justify-content: flex-end;

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
