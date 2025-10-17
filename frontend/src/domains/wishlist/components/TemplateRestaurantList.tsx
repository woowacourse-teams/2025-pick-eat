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
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.GAP.level3};

    padding-top: ${({ theme }) => theme.PADDING.p4};
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
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
  RestaurantWrapper: styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level6};

    padding: ${({ theme }) => theme.PADDING.p6} 0;
    overflow-y: scroll;
  `,
};
