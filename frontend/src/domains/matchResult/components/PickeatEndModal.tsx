import Button from '@components/actions/Button';
import Modal from '@components/modal/Modal';

import { pickeat } from '@apis/pickeat';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

function PickeatEndModal() {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const navigate = useNavigate();
  const endPickeat = async () => {
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '모든 음식점이 소거되어 메인 페이지 이동',
      value: 1,
    });
    try {
      await pickeat.patchDeactive(pickeatCode);
      navigate(ROUTE_PATH.MAIN);
    } catch {
      alert('픽잇 종료를 실패했습니다.');
      navigate(ROUTE_PATH.MAIN);
    }
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
        <S.Text> 모든 음식점이 소거되어 픽잇이 종료 되었습니다.</S.Text>
        <Button text="메인 페이지로 이동" color="gray" onClick={endPickeat} />
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
    gap: ${({ theme }) => theme.GAP.level3};

    text-align: center;
  `,
  PointText: styled.span`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
  Text: styled.span`
    color: black;
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
};
