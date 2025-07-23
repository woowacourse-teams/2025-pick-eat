import Like from '@components/actions/Like';

import styled from '@emotion/styled';

import { usePreferRestaurantContext } from '../context/PreferRestaurantProvider';

type Prop = {
  id: number;
  name: string;
  // category: '한식' | '중식' | '일식' | '양식' | '기타';
  category: string;
  distance: number;
  likeCount: number;
};

function PreferRestaurantItem({ id, name, distance, likeCount }: Prop) {
  const { liked } = usePreferRestaurantContext();
  return (
    <S.Container liked={liked(id)}>
      <S.CardContent>
        <S.TitleWrapper>
          <S.RestaurantName>{name}</S.RestaurantName>
          {/* <Badge>{category}</Badge> */}
        </S.TitleWrapper>
        <S.Distance>식당까지 {distance}m</S.Distance>
        <S.LinkButton
          //   href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          식당 상세 정보 보기
        </S.LinkButton>
      </S.CardContent>

      <Like id={id} count={likeCount} />
    </S.Container>
  );
}

export default PreferRestaurantItem;

const S = {
  Container: styled.div<{ liked: boolean }>`
    width: 312px;
    height: fit-content;
    display: flex;

    align-items: flex-end;
    overflow: hidden;
    position: relative;

    padding: 20px;

    background-color: ${({ theme, liked }) =>
      liked ? theme.PALETTE.secondary[5] : theme.PALETTE.secondary[0]};

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    box-shadow: 0 4px 20px #00000014;
    transform: scale(1);
  `,

  CardContent: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    filter: none;
    opacity: 1;
  `,

  TitleWrapper: styled.div`
    display: flex;
    gap: 8px;
  `,

  Distance: styled.p`
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  RestaurantName: styled.a`
    max-width: 180px;
    overflow: hidden;

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    white-space: nowrap;
    text-overflow: ellipsis;
  `,

  LinkButton: styled.a`
    width: fit-content;
    align-items: center;
    gap: 4px;

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.gray[70]};
      text-decoration: underline;
    }
  `,
};
