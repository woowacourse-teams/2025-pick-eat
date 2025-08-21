import Arrow from '@components/assets/icons/Arrow';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

const WISHLIST_MOCK_DATA = [
  {
    id: 1,
    name: '잠실',
    image:
      'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/template_images/jamsil_restaurant.png',
  },
  {
    id: 2,
    name: '선릉',
    image:
      'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/template_images/seonreung_restaurant.png',
  },
];

const PublicWishlist = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId') ?? '';

  const handlePublicWishlistClick = async (id: number) => {
    try {
      const code = await pickeat.post(roomId, makePickeatName());
      await pickeat.postWish(id, code);
      if (code) navigate(generateRouterPath.pickeatDetail(code));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <S.Container>
      {WISHLIST_MOCK_DATA.map(item => (
        <S.ThumbnailBox key={item.id}>
          <S.ThumbnailImg
            key={item.id}
            onClick={() => handlePublicWishlistClick(item.id)}
            imgUrl={item.image}
          />
          <S.TitleBox onClick={() => handlePublicWishlistClick(item.id)}>
            <S.Title>시작하기</S.Title>
            <S.LinkButton>
              <Arrow size="sm" direction="right" />
            </S.LinkButton>
          </S.TitleBox>
        </S.ThumbnailBox>
      ))}
    </S.Container>
  );
};

export default PublicWishlist;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p7} 0;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
  ThumbnailBox: styled.div`
    width: 160px;
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    padding: ${({ theme }) => theme.PADDING.p3};
    border-radius: ${({ theme }) => theme.RADIUS.medium3};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    cursor: pointer;
  `,
  ThumbnailImg: styled.div<{ imgUrl: string }>`
    width: 140px;
    height: 140px;

    border: 5px solid white;

    background-image: url(${({ imgUrl }) => imgUrl});
    background-size: cover;
    border-radius: ${({ theme }) => theme.RADIUS.medium2};
  `,
  TitleBox: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.PADDING.p4};
    cursor: pointer;
  `,
  Title: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[80]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  LinkButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.PALETTE.gray[40]};
  `,
};
