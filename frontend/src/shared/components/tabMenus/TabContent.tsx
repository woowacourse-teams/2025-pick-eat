import styled from '@emotion/styled';
import { useRef } from 'react';

import { useFitHeightToActiveChild } from './hooks/useFitHeightToActiveChild';

type Props = {
  selectedIndex: number;
  tabContents: React.ReactNode[];
};

function TabContent({ selectedIndex, tabContents }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, contentRefs] = useFitHeightToActiveChild<HTMLDivElement>(
    selectedIndex,
    [tabContents]
  );

  return (
    <S.Container ref={containerRef} height={height}>
      {tabContents.map((content, idx) => {
        const offset = idx - selectedIndex;
        return (
          <S.ContentBox
            key={idx}
            ref={el => {
              contentRefs.current[idx] = el!;
            }}
            offset={offset}
          >
            {content}
          </S.ContentBox>
        );
      })}
    </S.Container>
  );
}

export default TabContent;

const S = {
  Container: styled.div<{ height: number | null }>`
    width: 100%;

    ${({ height }) =>
      `height: ${height}px;
       transition: ${height} 0.3s cubic-bezier(0.4,0,0.2,1)`};

    overflow: hidden;
    position: relative;
  `,
  ContentBox: styled.div<{ offset: number }>`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(${({ offset }) => offset * 100}%);
  `,
};
