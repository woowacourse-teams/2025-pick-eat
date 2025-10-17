import styled from '@emotion/styled';

type Props = {
  title: string;
  description?: string;
};

function ContentTitle({ title, description }: Props) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {description && <S.Description>{description}</S.Description>}
    </S.Container>
  );
}

export default ContentTitle;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  Title: styled.h3`
    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.body.xlarge_bold};
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,
};
