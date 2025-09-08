import Button from '@components/actions/Button';
import Input from '@components/actions/Input';

import { copyLink } from '@utils/copyLink';

import styled from '@emotion/styled';

function CopyLink({ url }: { url: string }) {
  return (
    <S.Container>
      <Input value={url} disabled />
      <Button text="복사" size="md" onClick={() => copyLink(url)} />
    </S.Container>
  );
}

export default CopyLink;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
    width: 100%;
  `,
};
