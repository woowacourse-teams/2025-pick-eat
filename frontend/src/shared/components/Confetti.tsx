/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const Confetti = () => {
  return (
    <ConfettiContainer>
      <Piece delay="0s" left="30%" color="#ff4d4f" />
      <Piece delay="0.2s" left="40%" color="#40a9ff" />
      <Piece delay="0.4s" left="50%" color="#ffc53d" />
      <Piece delay="0.6s" left="65%" color="#73d13d" />
      <Piece delay="0.8s" left="70%" color="#9254de" />

      <Piece delay="0.6s" left="35%" color="#ff4d4f" />
      <Piece delay="0s" left="75%" color="#40a9ff" />
      <Piece delay="0.8s" left="50%" color="#ffc53d" />
      <Piece delay="0.2s" left="15%" color="#73d13d" />
      <Piece delay="0.4s" left="55%" color="#9254de" />
    </ConfettiContainer>
  );
};

export default Confetti;

// =========================== styled ===========================

const fall = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(200px) rotate(360deg);
    opacity: 0;
  }
`;

const ConfettiContainer = styled.div`
  width: 50%;
  height: 200px;
  overflow: hidden;
  position: fixed;
  top: 20%;
`;

const Piece = styled.div<{
  delay: string;
  left: string;
  color: string;
}>`
  width: 10px;
  height: 10px;
  position: absolute;
  top: -10px;
  left: ${({ left }) => left};

  background-color: ${({ color }) => color};

  animation: ${fall} 1s ease-in infinite;
  animation-delay: ${({ delay }) => delay};
`;
