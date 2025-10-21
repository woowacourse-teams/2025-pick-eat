import NewButton from '@components/actions/NewButton';
import Modal from '@components/modal/Modal';

import { pickeatQuery } from '@apis/pickeat';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

function PickeatEndModal() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const navigate = useNavigate();

  const { mutate: deactivatePickeat } = pickeatQuery.usePatchDeactive();

  const endPickeat = async () => {
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '모든 음식점이 소거되어 메인 페이지 이동',
      value: 1,
    });
    deactivatePickeat(pickeatCode);

    navigate(ROUTE_PATH.MAIN);
  };
  return (
    <Modal
      opened={true}
      mounted={true}
      onClose={() => {}}
      closeButton={false}
      size="sm"
    >
      <S.Container>
        <S.PointText>이런!😥</S.PointText>
        <S.Text> 모든 음식점이 소거되어 픽잇이 종료되었습니다.</S.Text>
        <NewButton onClick={endPickeat}>메인 페이지로 이동</NewButton>
      </S.Container>
    </Modal>
  );
}

export default PickeatEndModal;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};

    text-align: center;
  `,
  PointText: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Text: styled.span`
    color: black;
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
