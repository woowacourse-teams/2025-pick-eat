import Button from '@components/actions/Button';
import Share from '@components/assets/icons/Share';
import Chip from '@components/labels/Chip';

import { copyLink } from '@utils/copyLink';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { usePickeatResult } from '@pages/pickeat/matchResult/hooks/usePickeatResult';

type Props = {
  pickeatCode: string;
};

function Result({ pickeatCode }: Props) {
  const pickeatResult = usePickeatResult(pickeatCode);

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
