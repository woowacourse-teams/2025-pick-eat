import styled from '@emotion/styled';

interface Props {
  activeTab: number;
  tabContents: React.ReactNode[];
}

function TabContent({ activeTab, tabContents }: Props) {
  return (
    <S.Container>
      <S.ContentSlider activeIndex={activeTab}>
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
    height: 310px;
    background-color: ${({ theme }) => theme.PALLETE.gray[5]};
    overflow-y: scroll;
    position: relative;
  `,
  ContentSlider: styled.div<{ activeIndex: number }>`
    display: flex;
    width: 500%;
    height: 100%;
    transition: transform 0.3s ease;
    transform: translateX(-${props => props.activeIndex * 20}%);
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
