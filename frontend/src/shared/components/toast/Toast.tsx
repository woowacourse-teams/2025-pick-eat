import styled from '@emotion/styled';
import { useEffect } from 'react';

type Props = {
  message: string;
  mode: 'ERROR' | 'SUCCESS' | 'WARN';
  onRemove: () => void;
};

const COLOR_MAP = {
  ERROR: 'red',
  SUCCESS: 'green',
  WARN: 'yellow',
};

function Toast({ message, mode, onRemove }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <S.Container>
      <S.ProgressBar mode={mode} />
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
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    font: ${({ theme }) => theme.FONTS.body.small};

    animation: fade-animation 0.5s ease-out;
    border-radius: ${({ theme }) => theme.RADIUS.medium2};
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

  ProgressBar: styled.div<{ mode: 'ERROR' | 'SUCCESS' | 'WARN' }>`
    width: 100%;
    height: 4px;
    position: absolute;
    top: 0;
    left: 0;

    background-color: ${({ mode }) => COLOR_MAP[mode]};

    animation: progress-bar-animation 2s linear forwards;
    border-radius: ${({ theme }) => theme.RADIUS.medium2}
      ${({ theme }) => theme.RADIUS.medium2} 0 0;

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
