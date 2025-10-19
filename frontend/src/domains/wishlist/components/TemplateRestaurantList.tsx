import LoadingSpinner from '@components/assets/LoadingSpinner';
import RestaurantCard from '@components/RestaurantCard';

import { templateQuery } from '@apis/template';

import styled from '@emotion/styled';

type Props = {
  title: string;
  templateId: number;
};

function TemplateRestaurantList({ title, templateId }: Props) {
  const { data, isLoading } = templateQuery.useGetTemplate(templateId);
  return (
    <S.Container>
      <S.TitleSection>
        <S.Title>{title} 맛집</S.Title>
        <S.Description>
          픽잇 팀 추천 {title} 맛집 목록을 만나보세요!
        </S.Description>
      </S.TitleSection>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <S.RestaurantWrapper>
          {data?.map(item => (
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
