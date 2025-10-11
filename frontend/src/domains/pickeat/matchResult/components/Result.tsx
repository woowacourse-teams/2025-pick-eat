import Button from '@components/actions/Button';
import Share from '@components/assets/icons/Share';
import Chip from '@components/labels/Chip';

import { ApiError } from '@apis/apiClient';
import { pickeat, PickeatResult } from '@apis/pickeat';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { copyLink } from '@utils/copyLink';

import { THEME } from '@styles/global';

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
  const { name, pictureUrls, placeUrl, tags } = pickeatResult;

  return (
    <S.Container>
      <S.ImageBox>
        <S.Image
          src={pictureUrls[0] || './images/restaurant.png'}
          alt={name}
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './images/restaurant.png';
          }}
        />
      </S.ImageBox>
      <S.BottomWrapper>
        <S.TitleBox>
          {tags.length > 0 && (
            <Chip key={tags[0]} variant="outlined" size="sm">
              {tags[0]}
            </Chip>
          )}
          <S.Name>{name}</S.Name>
        </S.TitleBox>
        <S.ButtonBox>
          <S.DetailBox>
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
          </S.DetailBox>
          <S.ShareBox onClick={() => copyLink(window.location.href)}>
            <Share color={THEME.PALETTE.gray[70]} size="sm" />
          </S.ShareBox>
        </S.ButtonBox>
      </S.BottomWrapper>
    </S.Container>
  );
}

export default Result;

const S = {
  Container: styled.div`
    width: 270px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
    border-radius: ${({ theme }) => theme.RADIUS.large};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,

  BottomWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p8};
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  TitleBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  ButtonBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  DetailBox: styled.div`
    width: 120px;
  `,
  ShareBox: styled.button`
    width: 30px;
    height: 30px;
  `,
  Name: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.heading.medium};

    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  ImageBox: styled.div`
    width: 100%;
    height: 180px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Image: styled.img`
    width: 100%;
  `,
};
