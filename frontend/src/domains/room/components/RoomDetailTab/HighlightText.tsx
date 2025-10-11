import styled from '@emotion/styled';

type Props = {
  text: string;
  searchKeyword: string;
};

function HighlightText({ text, searchKeyword }: Props) {
  const isPrefixMatch = text.startsWith(searchKeyword);

  if (!isPrefixMatch) {
    return <S.Text>{text}</S.Text>;
  }

  const matchedText = text.slice(0, searchKeyword.length);
  const unmatchedText = text.slice(searchKeyword.length);

  return (
    <>
      <S.HighlightText>{matchedText}</S.HighlightText>
      <S.Text>{unmatchedText}</S.Text>
    </>
  );
}

export default HighlightText;

const S = {
  HighlightText: styled.span`
    color: ${({ theme }) => theme.PALETTE.primary[50]};
  `,

  Text: styled.span``,
};
