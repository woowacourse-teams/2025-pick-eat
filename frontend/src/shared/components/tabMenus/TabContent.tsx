import styled from '@emotion/styled';

interface Props {
  selectedIndex: number;
  tabContents: React.ReactNode[];
}

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
    background-color: ${({ theme }) => theme.PALLETE.gray[5]};
    overflow-y: scroll;
    position: relative;
  `,
  ContentSlider: styled.div<{ selectedIndex: number }>`
    display: flex;
    width: 500%;
    height: 100%;
    transition: transform 0.3s ease;
    transform: translateX(-${props => props.selectedIndex * 20}%);
  `,
  ContentBox: styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  `,
};
