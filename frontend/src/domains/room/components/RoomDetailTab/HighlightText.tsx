import styled from '@emotion/styled';

type Props = {
  text: string;
  searchKeyword: string;
};

const HighlightText = ({ text, searchKeyword }: Props) => {
  const parts = text.split(new RegExp(`(${searchKeyword})`));

  return parts.map((part, index) =>
    part.toLowerCase() === searchKeyword.toLowerCase() ? (
      <S.HighlightText key={index}>{part}</S.HighlightText>
    ) : (
      <S.Text key={index}>{part}</S.Text>
    )
  );
};

export default HighlightText;

const S = {
  HighlightText: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
  `,

  Text: styled.span``,
};
