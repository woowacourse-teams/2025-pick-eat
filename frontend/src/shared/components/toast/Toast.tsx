import styled from '@emotion/styled';
import { useEffect } from 'react';

type Props = {
  message: string;
  mode: 'ERROR' | 'SUCCESS' | 'WARN';
  onRemove: () => void;
  timeSet: number;
};

const COLOR_MAP = {
  ERROR: 'red',
  SUCCESS: 'green',
  WARN: 'yellow',
};

export const DEFAULT_TIME = 2000;

function Toast({ message, mode, onRemove, timeSet }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, timeSet);

    return () => clearTimeout(timer);
  }, []);
  return (
    <S.Container>
      <S.ProgressBar timeSet={timeSet} mode={mode} />
      {message}
    </S.Container>
  );
}

export default Toast;

const S = {
  Container: styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    font: ${({ theme }) => theme.FONTS.body.small};

    animation: fade-animation 0.5s ease-out;
    border-radius: ${({ theme }) => theme.RADIUS.small};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level4};

    @keyframes fade-animation {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  `,

  ProgressBar: styled.div<{
    mode: 'ERROR' | 'SUCCESS' | 'WARN';
    timeSet: number;
  }>`
    width: 100%;
    height: 4px;
    position: absolute;
    top: 0;
    left: 0;

    background-color: ${({ mode }) => COLOR_MAP[mode]};

    animation: ${({ timeSet }) =>
      `progress-bar-animation ${timeSet / 1000}s linear forwards`};

    @keyframes progress-bar-animation {
      from {
        width: 100%;
      }

      to {
        width: 0%;
      }
    }
  `,
};
