import Button from '@components/actions/Button';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { pickeat } from '@apis/pickeat';

import { useGA } from '@hooks/useGA';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

function PickeatEndButton() {
  const {
    opened,
    mounted,
    handleOpenModal,
    handleCloseModal,
    handleUnmountModal,
  } = useModal();

  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const navigate = useNavigate();

  const endPickeat = async () => {
    handleCloseModal();
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '결과 페이지 이동 버튼',
      value: 1,
    });
    try {
      await pickeat.postResult(pickeatCode);
      navigate(generateRouterPath.matchResult(pickeatCode));
    } catch {
      return alert('픽잇 결과를 가져오는 데 실패했습니다.');
    }
  };

  return (
    <>
      <Button text="투표 종료" size="md" onClick={handleOpenModal} />
      <Modal
        opened={opened}
        mounted={mounted}
        onUnmount={handleUnmountModal}
        onClose={handleCloseModal}
      >
        <S.Container>
          정말 종료하시겠습니까?
          <S.Wrapper>
            <Button text="취소" color="gray" onClick={handleUnmountModal} />
            <Button text="종료" onClick={endPickeat} />
          </S.Wrapper>
        </S.Container>
      </Modal>
    </>
  );
}

export default PickeatEndButton;

const S = {
  Container: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
    flex-direction: column;
  `,
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
