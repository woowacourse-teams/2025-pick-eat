import Search from '@components/assets/icons/Search';

import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import Input from '../Input/Input';

type Props = {
  label?: string;
} & ComponentProps<'input'>;

function SearchBar({ ...props }: Props) {
  return (
    <S.Container>
      <Input {...props} />
      <S.Icon>
        <Search size="sm" />
      </S.Icon>
    </S.Container>
  );
}

export default SearchBar;

const S = {
  Container: styled.div`
    width: 100%;
    position: relative;
  `,

  Icon: styled.div`
    position: absolute;
    right: 10px;
    bottom: 15px;
  `,
};
