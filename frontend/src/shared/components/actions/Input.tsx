import styled from '@emotion/styled';

function Input({ ...props }) {
  return <S.InputContainer {...props} />;
}
export default Input;

const S = {
  InputContainer: styled.input`
    width: 100%;
    height: 56px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.PALLETE.gray[60]};
    padding: 6px;
  `,
};
