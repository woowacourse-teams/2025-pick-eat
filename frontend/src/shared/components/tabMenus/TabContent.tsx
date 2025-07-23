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
    <S.Container
      ref={containerRef}
      style={{
        height: height !== null ? height : undefined,
        transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {tabContents.map((content, idx) => {
        const offset = idx - selectedIndex;
        return (
          <S.ContentBox
            key={idx}
            ref={el => {
              contentRefs.current[idx] = el!;
            }}
            isActive={selectedIndex === idx}
            style={{
              transform: `translateX(${offset * 100}%)`,
              opacity: Math.abs(offset) > 1 ? 0 : 1,
              transition:
                'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
            }}
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
  Container: styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;

    background: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
  ContentBox: styled.div<{ isActive: boolean }>`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform, opacity;
  `,
};
