import Button from '@components/actions/Button';

import { Restaurant } from '@apis/restaurant';

import styled from '@emotion/styled';
import { use } from 'react';

type Prop = {
  //백엔드에서 이제 하나로
  resultPromise: Promise<Restaurant[]>;
};

function Result({ resultPromise }: Prop) {
  const result = use(resultPromise)[0];
  console.log(result);
  return (
    <>
      <S.Name>{result.name}</S.Name>{' '}
      <S.ButtonContainer>
        <Button
          color="primary"
          text="식당 싱세 정보"
          onClick={() =>
            window.open(result.placeUrl, '_blank', 'noopener,noreferrer')
          }
        />
      </S.ButtonContainer>
    </>
  );
}

export default Result;

const S = {
  ButtonContainer: styled.div`
    width: 80%;
  `,

  Name: styled.p`
    padding: ${({ theme }) => theme.PADDING.p5};

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
};
