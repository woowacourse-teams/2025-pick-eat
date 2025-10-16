import Arrow from '@components/assets/icons/Arrow';
import Info from '@components/assets/icons/Info';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

import TemplateRestaurantList from './TemplateRestaurantList';

const CARD_SIZE = {
  sm: 200,
  lg: 260,
};

type Props = {
  templateId: number;
  title: string;
  imageUrl: string;
  onClick: () => void;
  size?: 'sm' | 'lg';
};

function Card({ templateId, title, imageUrl, onClick, size = 'lg' }: Props) {
  const {
    opened,
    mounted,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();

  return (
    <S.Container size={size} onClick={onClick}>
      <S.Image src={imageUrl} alt="" />
      <S.TopWrapper>
        <S.TitleArea>
          <S.Title>{title}</S.Title>
          <S.Description>식당 투표하기</S.Description>
        </S.TitleArea>
        <Arrow size="xlg" direction="right" color={THEME.PALETTE.gray[10]} />
      </S.TopWrapper>

      <S.InfoButton
        onClick={e => {
          e.stopPropagation();
          handleOpenModal();
        }}
      >
        <Info size="sm" color={THEME.PALETTE.gray[30]} />
      </S.InfoButton>
      <Modal
        opened={opened}
        mounted={mounted}
        onUnmount={handleUnmountModal}
        onClose={handleCloseModal}
      >
        <TemplateRestaurantList title={title} templateId={templateId} />
      </Modal>
    </S.Container>
  );
}
export default Card;

const S = {
  Container: styled.div<{ size: 'sm' | 'lg' }>`
    width: ${({ size }) => CARD_SIZE[size]}px;
    height: ${({ size }) => CARD_SIZE[size]}px;
    overflow: hidden;
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p8}
      ${({ theme }) => theme.PADDING.p4} 0 ${({ theme }) => theme.PADDING.p7};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
    cursor: pointer;
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    object-fit: cover;
    object-position: center;
  `,
  TopWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
  `,
  TitleArea: styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
  `,
  Title: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.body.large};
  `,
  InfoButton: styled.button`
    z-index: 1;
    position: absolute;
    top: 90px;
  `,
};
