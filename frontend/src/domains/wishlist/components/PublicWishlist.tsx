import Arrow from '@components/assets/icons/Arrow';

import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

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
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const showToast = useShowToast();

  const handlePublicWishlistClick = async (id: number) => {
    try {
      const code = await pickeat.post(roomId, makePickeatName());
      await pickeat.postWish(id, code);
      if (code) navigate(generateRouterPath.pickeatDetail(code));
    } catch (e) {
      if (e instanceof Error) showToast({ mode: 'ERROR', message: e.message });
    }
  };

  return (
    <S.Container>
      {WISHLIST_MOCK_DATA.map(item => (
        <S.ThumbnailBox
          key={item.id}
          onClick={() => handlePublicWishlistClick(item.id)}
        >
          <picture>
            <source
              type="image/webp"
              srcSet={item.image.replace(/\.(png|jpg|jpeg)$/, '.webp')}
            />
            <S.ThumbnailImg
              as="img"
              src={item.image}
              alt={item.name}
              loading="lazy"
            />
          </picture>
          <S.TitleBox>
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
    justify-content: space-between;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p3};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    box-shadow: rgb(0 0 0 / 10%) 0 4px 12px;
    cursor: pointer;
  `,
  ThumbnailImg: styled.img`
    width: 140px;
    height: 140px;

    border-radius: ${({ theme }) => theme.RADIUS.medium};
  `,
  TitleBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
