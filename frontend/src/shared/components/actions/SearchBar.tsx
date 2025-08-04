import Search from '@components/assets/icons/Search';

import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

import Input from './Input';

type Props = {
  label?: string;
  children?: ReactNode;
} & ComponentProps<'input'>;

function SearchBar({ children, ...props }: Props) {
  return (
    <S.Container>
      <S.InputWrapper>
        <Input {...props} />
        <S.SearchIcon>
          <Search size="sm" />
        </S.SearchIcon>
      </S.InputWrapper>
      {children && <S.ListSection>{children}</S.ListSection>}
    </S.Container>
  );
}

export default SearchBar;

const S = {
  Container: styled.div`
    width: 100%;
    position: relative;
  `,

  InputWrapper: styled.div``,

  SearchIcon: styled.div`
    position: absolute;
    right: 10px;
    bottom: 15px;
  `,

  ListSection: styled.ul`
    width: 100%;
    max-height: 300px;
    position: absolute;
    top: 110%;
    z-index: ${({ theme }) => theme.Z_INDEX.dropdown};

    padding: ${({ theme }) => theme.PADDING.p3};
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[60]};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.medium};
    overflow-x: scroll;
  `,
};
