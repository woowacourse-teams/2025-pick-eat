import Button from '@components/actions/Button';
import Share from '@components/assets/icons/Share';

import { ApiError } from '@apis/apiClient';
import { pickeat, PickeatResult } from '@apis/pickeat';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { copyLink } from '@utils/copyLink';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type Props = {
  pickeatCode: string;
};

function Result({ pickeatCode }: Props) {
  const [pickeatResult, setPickeatResult] = useState<PickeatResult | null>(
    null
  );
  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    const handleFetchResult = async () => {
      try {
        const result = await pickeat.getResult(pickeatCode);
        setPickeatResult(result);
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          showToast({
            mode: 'ERROR',
            message: '해당 픽잇에 접근할 수 없습니다.',
          });
          navigate(ROUTE_PATH.MAIN);
          return;
        }
        showToast({
          mode: 'ERROR',
          message: '픽잇 결과를 불러오지 못했습니다!',
        });
        throw e;
      }
    };
    handleFetchResult();
  }, []);
  if (!pickeatResult) return null;
  const { name, pictureUrls, placeUrl } = pickeatResult;

  return (
    <>
      <S.Wrapper>
        <S.Name>{name}</S.Name>
        <S.Image
          src={pictureUrls[0] || './images/restaurant.png'}
          alt={name}
          onError={e => (e.currentTarget.src = '/images/person.svg')}
        />
        <S.ButtonWrapper>
          {placeUrl && (
            <Button
              color="primary"
              text="식당 상세 정보"
              onClick={() =>
                placeUrl &&
                window.open(placeUrl, '_blank', 'noopener,noreferrer')
              }
            />
          )}
          <Button
            type="button"
            leftIcon={<Share size="sm" />}
            text="링크공유"
            color="secondary"
            onClick={() => copyLink(window.location.href)}
          />
        </S.ButtonWrapper>
      </S.Wrapper>
    </>
  );
}

export default Result;

const S = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level6};
  `,

  ButtonWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  Name: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,

  Image: styled.img`
    width: 130px;
  `,
};
