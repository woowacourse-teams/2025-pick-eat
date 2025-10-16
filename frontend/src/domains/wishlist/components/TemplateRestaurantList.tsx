import LoadingSpinner from '@components/assets/LoadingSpinner';
import RestaurantCard from '@components/RestaurantCard';

import { Wishes, wishlist } from '@apis/wishlist';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  templateId: number;
};

function TemplateRestaurantList({ title, templateId }: Props) {
  const [restaurantList, setRestaurantList] = useState<Wishes[]>([
    {
      id: 0,
      name: '',
      category: '한식',
      pictureUrls: [''],
      roadAddressName: '',
      tags: [''],
      wishlistId: 0,
      placeUrl: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTemplateRestaurantList = async () => {
      setLoading(true);
      const res = await wishlist.get(templateId);
      setRestaurantList(res);
      setLoading(false);
    };

    getTemplateRestaurantList();
  }, [templateId]);
  return (
    <S.Container>
      <S.TitleSection>
        <S.Title>{title} 맛집</S.Title>
        <S.Description>
          픽잇 팀 추천 {title} 맛집 목록을 만나보세요!
        </S.Description>
      </S.TitleSection>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <S.RestaurantWrapper>
          {restaurantList.map(item => (
            <RestaurantCard key={item.id} restaurantData={item} />
          ))}
        </S.RestaurantWrapper>
      )}
    </S.Container>
  );
}

export default TemplateRestaurantList;

const S = {
  Container: styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};
    justify-content: center;
  `,
  TitleSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.body.medium};
    color: ${({ theme }) => theme.PALETTE.gray[40]};
  `,
  RestaurantWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level6};
    height: 76vh;
    overflow-y: auto;
    align-items: center;
  `,
};
