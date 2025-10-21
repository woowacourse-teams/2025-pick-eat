import ActivateCircle from '@components/assets/icons/ActivateCircle';
import Enter from '@components/assets/icons/Enter';

import { roomQuery } from '@apis/room';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

import ContentTitle from './components/ContentTitle';

function ProgressPickeat() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const { data } = roomQuery.useGetProgressPickeats(roomId);
  const navigate = useNavigate();

  return (
    <S.Container>
      <ContentTitle
        title="진행 중인 투표"
        description="현재 방에서 진행 중인 투표에 입장해보세요!"
      />
      <S.List>
        {data.length !== 0 ? (
          data.map(pickeat => (
            <S.ProgressPickeat key={pickeat.id}>
              <S.TitleArea>
                <ActivateCircle size="xxs" activate={true} />
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
          ))
        ) : (
          <S.ProgressPickeat>
            <S.Description>진행 중인 투표가 없습니다.</S.Description>
          </S.ProgressPickeat>
        )}
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

    margin-bottom: ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,
  List: styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow: scroll;
    scrollbar-width: none;
  `,
  ProgressPickeat: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.small};
  `,
  TitleArea: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  ProgressIcon: styled.span``,
  Name: styled.li``,
  DescriptionArea: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  EnterButton: styled.button``,
  Description: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[50]};
  `,
};
