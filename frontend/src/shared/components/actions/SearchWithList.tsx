import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

import SearchBar from './SearchBar/SearchBar';

type Props = {
  label?: string;
  children?: ReactNode;
} & ComponentProps<'input'>;

function SearchWithList({ children, ...props }: Props) {
  return (
    <S.Container>
      <SearchBar {...props} />
      {children && <S.ListSection>{children}</S.ListSection>}
    </S.Container>
  );
}

export default SearchWithList;

const S = {
  Container: styled.div`
    width: 100%;
    position: relative;
  `,
  ListSection: styled.ul`
    width: 100%;
    max-height: 300px;
    overflow: scroll;
    position: absolute;
    top: 110%;
    z-index: ${({ theme }) => theme.Z_INDEX.dropdown};

    padding: ${({ theme }) => theme.PADDING.p3};
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[60]};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    scrollbar-width: none;
  `,
};
