import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

interface CheckBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onToggle: () => void;
}

const CheckBox = ({ checked, onToggle, ...props }: CheckBoxProps) => {
  return (
    <CheckButton checked={checked} onClick={onToggle} {...props}>
      <svg
        width="12"
        height="10"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.88428 11.17L1.71428 7L0.294281 8.41L5.88428 14L17.8843 2L16.4743 0.589996L5.88428 11.17Z"
          fill={checked ? '#ffffff' : '#BDBDBD'}
        />
      </svg>
    </CheckButton>
  );
};

export default CheckBox;

const CheckButton = styled.button<{ checked: boolean }>`
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: ${({ checked }) =>
    checked ? 'black solid 1px' : '#BDBDBD solid 1px'};

  background-color: ${({ checked }) => (checked ? 'black' : 'white')};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    border: ${({ checked }) =>
      checked ? 'black solid 1px' : '#BDBDBD solid 1px'};
  }
`;
