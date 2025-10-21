import Arrow from '@components/assets/icons/Arrow';
import Info from '@components/assets/icons/Info';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';

import TemplateRestaurantList from './TemplateRestaurantList';

const CARD_SIZE = {
  size: { sm: 200, lg: 260 },
  titleFont: {
    sm: THEME.FONTS.body.xxlarge_bold,
    lg: THEME.FONTS.heading.large,
  },
  descriptionFont: { sm: THEME.FONTS.body.medium, lg: THEME.FONTS.body.large },
  padding: {
    sm: `${THEME.PADDING.py6} ${THEME.PADDING.py2} 0 ${THEME.PADDING.py5}`,
    lg: `${THEME.PADDING.py8} ${THEME.PADDING.py4} 0 ${THEME.PADDING.py7}`,
  },
};

type Props = {
  itemId: number;
  isWish: boolean;
  title: string;
  imageUrl: string;
  onClick: () => void;
  size?: 'sm' | 'lg';
};

function Card({
  itemId,
  isWish,
  title,
  imageUrl,
  onClick,
  size = 'lg',
}: Props) {
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
          <S.Title size={size}>{title}</S.Title>
          <S.Description size={size}>식당 투표하기</S.Description>
        </S.TitleArea>
        <Arrow size="xlg" direction="right" color={THEME.PALETTE.gray[10]} />
      </S.TopWrapper>

      <S.InfoButton
        onClick={e => {
          e.stopPropagation();
          handleOpenModal();
        }}
      >
        {isWish && <Info size="sm" color={THEME.PALETTE.gray[30]} />}
      </S.InfoButton>
      <Modal
        opened={opened}
        mounted={mounted}
        onUnmount={handleUnmountModal}
        onClose={handleCloseModal}
      >
        <ErrorBoundary>
          <TemplateRestaurantList title={title} templateId={itemId} />
        </ErrorBoundary>
      </Modal>
    </S.Container>
  );
}
export default Card;

const S = {
  Container: styled.div<{ size: 'sm' | 'lg' }>`
    width: ${({ size }) => CARD_SIZE.size[size]}px;
    height: ${({ size }) => CARD_SIZE.size[size]}px;
    overflow: hidden;
    position: relative;

    padding: ${({ size }) => CARD_SIZE.padding[size]};

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
  Title: styled.span<{ size: 'sm' | 'lg' }>`
    font: ${({ size }) => CARD_SIZE.titleFont[size]};
  `,
  Description: styled.span<{ size: 'sm' | 'lg' }>`
    font: ${({ size }) => CARD_SIZE.descriptionFont[size]};
  `,
  InfoButton: styled.button`
    position: absolute;
    top: 90px;
    z-index: 1;
  `,
};
