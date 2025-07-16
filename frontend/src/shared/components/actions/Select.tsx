import Arrow from '@components/assets/icons/Arrow';
import styled from '@emotion/styled';
import { useBoolean } from '@hooks/useBoolean';

type Props = {
  value?: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
};

function Select({
  value,
  placeholder = '선택해주세요.',
  options,
  onChange,
}: Props) {
  const [open, , closeDropdown, toggleDropdown] = useBoolean(false);

  const changeOption = (option: string) => {
    onChange(option);
    closeDropdown();
  };

  return (
    <>
      <S.SelectBar onClick={toggleDropdown}>
        <S.SelectedValue>{value ?? placeholder}</S.SelectedValue>
        <Arrow direction="down" size="sm" />
      </S.SelectBar>

      {open && (
        <S.OptionList>
          {/* TODO: key값 설정 */}
          {options.map(option => (
            <S.Option onClick={() => changeOption(option)}>{option}</S.Option>
          ))}
        </S.OptionList>
      )}
    </>
  );
}
export default Select;

const S = {
  SelectBar: styled.button`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.PALLETE.gray[60]};
    border-radius: 5px;
    padding: 6px;
  `,

  SelectedValue: styled.span``,

  OptionList: styled.ul`
    border: 1px solid ${({ theme }) => theme.PALLETE.gray[60]};
    border-radius: 5px;
  `,

  Option: styled.li`
    padding: 10px 6px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.gray[5]};
    }
  `,
};
