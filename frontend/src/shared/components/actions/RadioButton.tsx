import styled from '@emotion/styled';

type Props = {
  checked: boolean;
  name: string;
  value: string;
  onChange: (value: string) => void;
};

function RadioButton({ checked, name, value, onChange }: Props) {
  return (
    <S.Container onClick={() => onChange(value)}>
      <S.HiddenInput>
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={checked}
        />
      </S.HiddenInput>
      <S.ButtonContainer checked={checked} type="button" />
    </S.Container>
  );
}

export default RadioButton;

const S = {
  Container: styled.div``,

  HiddenInput: styled.div`
    display: none;
  `,

  ButtonContainer: styled.button<{ checked: boolean }>`
    width: 20px;
    height: 20px;

    border: 2px solid
      ${({ checked, theme }) => (checked ? 'white' : theme.PALETTE.gray[30])};

    background-color: ${({ checked, theme }) =>
      checked ? theme.PALETTE.primary[50] : 'white'};
    border-radius: ${({ theme }) => theme.RADIUS.half};
  `,
};
