import Enter from '@components/assets/icons/Enter';

import { PickeatResponse } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { use } from 'react';
import { useNavigate } from 'react-router';

function ProgressPickeat({
  pickeats,
}: {
  pickeats: Promise<PickeatResponse[]>;
}) {
  const pickeatList = use(pickeats);
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Description>진행 중인 픽잇({pickeatList.length})</S.Description>
      <S.List>
        {pickeatList.map(pickeat => (
          <S.ProgressPickeat key={pickeat.id}>
            <S.TitleArea>
              <S.ProgressIcon>🟢</S.ProgressIcon>
              <S.Name>{pickeat.name}</S.Name>
            </S.TitleArea>

            <S.DescriptionArea>
              {pickeat.participantCount}명
              <S.EnterButton
                onClick={() =>
                  navigate(generateRouterPath.pickeatDetail(pickeat.code))
                }
              >
                <Enter size="sm" />
              </S.EnterButton>
            </S.DescriptionArea>
          </S.ProgressPickeat>
        ))}
      </S.List>
    </S.Container>
  );
}
export default ProgressPickeat;

const S = {
  Container: styled.div`
    width: 100%;
    min-height: 40%;

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,

  Description: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    font: ${({ theme }) => theme.FONTS.heading.small};
  `,

  List: styled.ul`
    overflow: scroll;
    scrollbar-width: none;
  `,

  ProgressPickeat: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  TitleArea: styled.div`
    display: flex;
    align-items: center;
  `,

  ProgressIcon: styled.span``,

  Name: styled.li`
    padding: ${({ theme }) => theme.PADDING.p3};
  `,

  DescriptionArea: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  EnterButton: styled.button``,
};
