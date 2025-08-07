import Button from '@components/actions/Button';

import { RestaurantResponse } from '@apis/restaurant';

import styled from '@emotion/styled';
import { use } from 'react';

type Props = {
  //TODO: 백엔드에서 이제 하나로
  resultPromise: Promise<RestaurantResponse | null>;
};

function Result({ resultPromise }: Props) {
  const result = resultPromise ? use(resultPromise) : null;
  if (!result) return null;
  const { name, type, pictureUrls } = result;

  return (
    <>
      <S.Name>{name}</S.Name>
      {type === 'WISH' && (
        <S.Image
          src={pictureUrls[0] || './images/restaurant.png'}
          alt={name}
          onError={e => (e.currentTarget.src = '/images/person.svg')}
        />
      )}
      <S.ButtonContainer>
        <Button
          color="primary"
          text="식당 싱세 정보"
          onClick={() =>
            result?.placeUrl &&
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
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,

  Image: styled.img`
    width: 130px;
  `,
};
