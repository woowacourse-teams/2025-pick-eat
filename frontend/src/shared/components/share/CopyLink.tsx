import Button from '@components/actions/Button';
import Input from '@components/actions/Input/Input';

import { copyLink } from '@utils/copyLink';

import styled from '@emotion/styled';

function CopyLink({ url }: { url: string }) {
  return (
    <S.Container>
      <S.Link>{url}</S.Link>
      <S.Icon type="button" onClick={() => copyLink(url)}>
        <Copy />
      </S.Icon>
    </S.Container>
  );
}

export default CopyLink;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: ${({ theme }) => theme.PADDING.p4}
      ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
    border-radius: 30px;
  `,
  Link: styled.span`
    overflow: hidden;

    color: ${({ theme }) => theme.PALETTE.gray[50]};

    white-space: nowrap;
  `,
  Icon: styled.button``,
};
