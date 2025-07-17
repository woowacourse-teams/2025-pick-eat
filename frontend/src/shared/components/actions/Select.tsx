import Arrow from '@components/assets/icons/Arrow';
import styled from '@emotion/styled';
import { useBoolean } from '@hooks/useBoolean';
import {
  ReactNode,
  useContext,
  createContext,
  MouseEvent,
  useEffect,
} from 'react';

type BarProps = {
  selectedValue?: string;
  label?: string;
  placeholder?: string;
  onChange: (option: { value: string; label: string }) => void;
  children: ReactNode;
};

type OptionProps = {
  value: string;
  children: ReactNode;
};

type OptionContextType = (option: { value: string; label: string }) => void;

const selectContext = createContext<OptionContextType | undefined>(undefined);

function Option({ value, children }: OptionProps) {
  const onChange = useContext(selectContext);
  const clickOption = (e: MouseEvent<HTMLLIElement>) => {
    onChange?.({ value: value, label: e.currentTarget.textContent as string });
  };

  return <S.Option onClick={clickOption}>{children}</S.Option>;
}

function Bar({
  selectedValue,
  label,
  placeholder = '선택해주세요.',
  onChange,
  children,
}: BarProps) {
  const [open, , closeDropdown, toggleDropdown] = useBoolean(false);

  const handleChange = (option: { value: string; label: string }) => {
    onChange(option);
    closeDropdown();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener('click', closeDropdown);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('click', closeDropdown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <selectContext.Provider value={handleChange}>
      <S.SelectContainer onClick={e => e.stopPropagation()}>
        {label && <S.Label>{label}</S.Label>}

        <S.SelectBar
          onClick={toggleDropdown}
          isSelected={Boolean(selectedValue)}
        >
          <S.SelectedValue>{selectedValue ?? placeholder}</S.SelectedValue>
          <Arrow direction={open ? 'up' : 'down'} size="sm" />
        </S.SelectBar>

        {open && <S.OptionList>{children}</S.OptionList>}
      </S.SelectContainer>
    </selectContext.Provider>
  );
}

const Select = { Bar, Option };

export default Select;

const S = {
  SelectContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  `,

  Label: styled.label`
    color: ${({ theme }) => theme.PALLETE.gray[60]};
    ${({ theme }) => theme.TYPOGRAPHY.body.small}
  `,

  SelectBar: styled.button<{ isSelected: boolean }>`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    border: ${({ theme }) => `1px solid ${theme.PALLETE.gray[60]}`};
    border-radius: 5px;
    padding: 8px;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.PALLETE.gray[100] : theme.PALLETE.gray[60]};
    ${({ theme }) => theme.TYPOGRAPHY.body.medium};

    &:focus {
      outline: none;
      border: 2px solid ${({ theme }) => theme.PALLETE.primary[60]};
    }
  `,

  SelectedValue: styled.span``,

  OptionList: styled.ul`
    width: 100%;
    border: 1px solid ${({ theme }) => theme.PALLETE.gray[60]};
    background-color: ${({ theme }) => theme.PALLETE.gray[0]};
    padding: 8px;
    border-radius: 5px;
    position: absolute;
    top: 110%;
  `,

  Option: styled.li`
    padding: 15px 8px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.gray[5]};
    }
  `,
};
