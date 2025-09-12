import Button from '@components/actions/Button';

import { PickeatResult } from '@apis/pickeat';

import styled from '@emotion/styled';
import { use } from 'react';

type Props = {
  resultPromise: Promise<PickeatResult | null>;
};

function Result({ resultPromise }: Props) {
  const result = resultPromise ? use(resultPromise) : null;
  if (!result) return null;
  const { name, pictureUrls, placeUrl } = result;

  return (
    <S.Wrapper>
      <S.Name>{name}</S.Name>
      <S.Image
        src={pictureUrls[0] || './images/restaurant.png'}
        alt={name}
        onError={e => (e.currentTarget.src = '/images/person.svg')}
      />
      {placeUrl && (
        <S.ButtonWrapper>
          <Button
            color="primary"
            text="식당 상세 정보"
            onClick={() =>
              placeUrl && window.open(placeUrl, '_blank', 'noopener,noreferrer')
            }
          />
        </S.ButtonWrapper>
      )}
    </S.Wrapper>
  );
}

export default Result;

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  ButtonWrapper: styled.div`
    width: 100%;
  `,

  Name: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,

  Image: styled.img`
    width: 130px;
  `,
};
