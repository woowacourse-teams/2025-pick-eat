import Arrow from '@components/assets/icons/Arrow';

import { useBoolean } from '@hooks/useBoolean';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
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

const getSelectStateColor = (selected: boolean, opened: boolean) => {
  if (opened) return `${THEME.PALETTE.primary[50]}`;
  if (selected) return `${THEME.PALETTE.gray[100]}`;
  return `${THEME.PALETTE.gray[40]}`;
};

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
  placeholder = '선택해 주세요.',
  onChange,
  children,
}: BarProps) {
  const [opened, , closeDropdown, toggleDropdown] = useBoolean(false);

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
    if (!opened) return;

    window.addEventListener('click', closeDropdown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', closeDropdown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const selected = Boolean(selectedValue);

  return (
    <selectContext.Provider value={handleChange}>
      <S.SelectContainer onClick={e => e.stopPropagation()}>
        {label && <S.Label>{label}</S.Label>}

        <S.SelectBar
          type="button"
          onClick={toggleDropdown}
          opened={opened}
          selected={selected}
        >
          <S.SelectedValue selected={selected}>
            {selectedValue ?? placeholder}
          </S.SelectedValue>
          <Arrow
            direction={opened ? 'up' : 'down'}
            size="lg"
            color={getSelectStateColor(selected, opened)}
          />
        </S.SelectBar>

        {opened && <S.OptionList>{children}</S.OptionList>}
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
    gap: ${({ theme }) => theme.GAP.level3};
    position: relative;
  `,

  Label: styled.label`
    color: ${({ theme }) => theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,

  SelectBar: styled.button<{ opened: boolean; selected: boolean }>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    padding: ${({ theme }) => theme.PADDING.p2} 0
      ${({ theme }) => theme.PADDING.p2} ${({ theme }) => theme.PADDING.p2};
    border-bottom: ${({ opened, selected }) =>
      `2px solid ${getSelectStateColor(selected, opened)}`};
  `,

  SelectedValue: styled.span<{ selected: boolean }>`
    color: ${({ selected, theme }) =>
      selected ? theme.PALETTE.gray[100] : theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.xlarge_bold};
  `,

  OptionList: styled.ul`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    position: absolute;
    top: 110%;

    padding: ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p4};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.small};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};
  `,

  Option: styled.li`
    height: 35px;
    display: flex;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p3};

    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.medium_bold};
    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    }
  `,
};
