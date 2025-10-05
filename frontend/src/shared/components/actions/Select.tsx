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

  return (
    <selectContext.Provider value={handleChange}>
      <S.SelectContainer onClick={e => e.stopPropagation()}>
        {label && <S.Label>{label}</S.Label>}

        <S.SelectBar type="button" onClick={toggleDropdown} opened={opened}>
          <S.SelectedValue isSelected={Boolean(selectedValue)}>
            {selectedValue ?? placeholder}
          </S.SelectedValue>
          <Arrow
            direction={opened ? 'up' : 'down'}
            size="sm"
            color={opened ? THEME.PALETTE.primary[50] : THEME.PALETTE.gray[60]}
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

  SelectBar: styled.button<{ opened: boolean }>`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    padding: ${({ theme }) => theme.PADDING.p3};
    border-bottom: ${({ theme, opened }) =>
      opened
        ? `2px solid  ${theme.PALETTE.primary[50]}`
        : `2px solid ${theme.PALETTE.gray[60]}`};
  `,

  SelectedValue: styled.span<{ isSelected: boolean }>`
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.PALETTE.gray[100] : theme.PALETTE.gray[60]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  //TODO: radius,font,gap theme에서 뽑아쓰기
  OptionList: styled.ul`
    width: 100%;
    position: absolute;
    top: 110%;

    display: flex;
    flex-direction: column;

    padding: ${({ theme }) => theme.PADDING.p5}
      ${({ theme }) => theme.PADDING.p4};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};
    gap: 10px;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 16px;
  `,

  Option: styled.li`
    cursor: pointer;
    font:
      600 16px/150% Pretendard,
      sans-serif;
    color: ${({ theme }) => theme.PALETTE.gray[40]};

    &:hover {
      background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    }
  `,
};
