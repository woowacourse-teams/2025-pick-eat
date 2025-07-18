import styled from '@emotion/styled';

type Props = {
  selectedIndex: number;
  tabContents: React.ReactNode[];
};

function TabContent({ selectedIndex, tabContents }: Props) {
  return (
    <S.Container>
      <S.ContentSlider selectedIndex={selectedIndex}>
        {tabContents.map((content, tabIndex) => (
          <S.ContentBox key={tabIndex}>{content}</S.ContentBox>
        ))}
      </S.ContentSlider>
    </S.Container>
  );
}

export default TabContent;

const S = {
  Container: styled.div`
    width: 100%;
    height: fit-content;
    position: relative;

    background-color: ${({ theme }) => theme.PALLETE.gray[5]};
    overflow-y: scroll;
  `,
  ContentSlider: styled.div<{ selectedIndex: number }>`
    width: 500%;
    height: 100%;
    display: flex;

    transition: transform 0.3s ease;
    transform: translateX(-${({ selectedIndex }) => selectedIndex * 20}%);
  `,
  ContentBox: styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 20px;
  `,
};
