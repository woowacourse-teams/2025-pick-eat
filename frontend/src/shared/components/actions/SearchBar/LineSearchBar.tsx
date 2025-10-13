import Erase from '@components/assets/icons/Erase';
import Search from '@components/assets/icons/Search';

import styled from '@emotion/styled';
import { ComponentProps, ReactNode, useId } from 'react';

type Props = {
  label?: string;
  xIcon?: ReactNode;
  onClear?: () => void;
  defenseClick?: boolean;
} & ComponentProps<'input'>;

function LineSearchBar({
  placeholder = '검색어를 입력해 주세요.',
  label,
  xIcon,
  onClear,
  defenseClick,
  ...props
}: Props) {
  const inputId = useId();

  return (
    <S.Container defenseClick={defenseClick}>
      {label && <S.Label htmlFor={inputId}>{label}</S.Label>}
      <S.SearchIcon>
        <Search />
      </S.SearchIcon>
      <S.LineInput id={inputId} placeholder={placeholder} {...props} />
      {xIcon && (
        <S.xIcon onClick={onClear}>
          <Erase />
        </S.xIcon>
      )}
    </S.Container>
  );
}

export default LineSearchBar;

const S = {
  Container: styled.div<{ defenseClick?: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    position: relative;
    pointer-events: ${({ defenseClick }) => (defenseClick ? 'none' : '')};
  `,
  Label: styled.label<{ required?: boolean }>`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
  SearchIcon: styled.div`
    position: absolute;
    bottom: 8px;
  `,
  LineInput: styled.input`
    width: 100%;

    padding-bottom: ${({ theme }) => theme.PADDING.p3};

    padding-left: ${({ theme }) => theme.PADDING.p8};

    border: none;

    background-color: transparent;

    color: ${({ theme }) => theme.PALETTE.gray[95]};

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    border-bottom: 2px solid ${({ theme }) => theme.PALETTE.primary[50]};

    &:placeholder-shown {
      color: ${({ theme }) => theme.PALETTE.gray[30]};
    }

    &:focus {
      outline: none;
    }
  `,
  xIcon: styled.button`
    position: absolute;
    right: 0;
    bottom: 8px;
  `,
};
