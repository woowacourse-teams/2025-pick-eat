import Trash from '@components/assets/icons/Trash';
import Chip from '@components/labels/Chip';

import { Wishes } from '@apis/wishlist';

import styled from '@emotion/styled';

type Props = {
  wishData: Omit<Wishes, 'id' | 'wishlistId'>;
  onDelete: () => void;
};

function WishCard({ wishData, onDelete }: Props) {
  const { name, pictures, category, roadAddressName, tags, placeUrl } =
    wishData;
  return (
    <S.Container>
      <S.Image
        src={
          pictures.length === 0
            ? '/images/restaurant.png'
            : pictures[0].imageDownloadUrl
        }
        alt={name}
        onError={e => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/images/restaurant.png';
        }}
      />

      <S.Info>
        <S.TopArea>
          <S.ChipWrapper>
            <Chip color="primary">{category}</Chip>
            {tags.map(tag =>
              tag.length === 0 ? null : <Chip key={tag}>{tag}</Chip>
            )}
          </S.ChipWrapper>

          <S.RemoveBtn type="button" onClick={onDelete}>
            <Trash size="xs" color="red" />
          </S.RemoveBtn>
        </S.TopArea>
        <S.Name>{name}</S.Name>
        <S.Address>{roadAddressName}</S.Address>
        {placeUrl && (
          <S.LinkButton
            href={`${placeUrl}#menuInfo`}
            target="_blank"
            rel="noopener noreferrer"
          >
            메뉴 보러가기
          </S.LinkButton>
        )}
      </S.Info>
    </S.Container>
  );
}

export default WishCard;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  Image: styled.img`
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    object-fit: cover;
  `,

  Info: styled.div`
    flex: 1;
  `,

  ChipWrapper: styled.div`
    max-height: 54px;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level2};
    overflow: hidden;
  `,

  TopArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  RemoveBtn: styled.button``,

  Name: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  Address: styled.p`
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
  LinkButton: styled.a`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.xsmall};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.gray[70]};
    }
  `,
};
