import Search from '@components/assets/icons/Search';

import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

import LineInput from '../Input/LineInput';

type Props = {
  label?: string;
  color?: string;
  rightIcon?: ReactNode;
} & ComponentProps<'input'>;

function LineSearchBar({ ...props }: Props) {
  return (
    <S.Container>
      <LineInput leftIcon={<Search />} {...props} />
    </S.Container>
  );
}

export default LineSearchBar;

const S = {
  Container: styled.div`
    width: 100%;
    position: relative;
  `,
};
