import Button from '@components/actions/Button';

import { pickeatQuery } from '@apis/pickeat';

import { useGA } from '@hooks/useGA';

import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

import PickeatDecisionInfo from './PickeatDecisionInfo';

type Props = {
  onCancel?: () => void;
  onConfirm?: () => void;
  remainingCount: number;
};

function PickeatEndConfirm({
  onCancel = () => {},
  onConfirm = () => {},
  remainingCount,
}: Props) {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const { mutate: postResult } = pickeatQuery.usePostResult();

  const endPickeat = async () => {
    onConfirm();
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '결과 페이지 이동 버튼',
      value: 1,
    });

    postResult(pickeatCode);
  };

  return (
    <S.Container role="dialog" aria-modal="true" aria-describedby="dialog-desc">
      <S.Title id="dialog-title">잠깐✋</S.Title>
      <S.Description aria-live="polite" id="dialog-desc">
        {remainingCount === 0 || (
          <>
            {remainingCount}명이 투표를 완료하지 않았어요! <br />
          </>
        )}
        정말 종료하시겠습니까?
      </S.Description>

      <PickeatDecisionInfo />
      <S.Wrapper>
        <Button text="취소" color="gray" onClick={onCancel} />
        <Button text="종료" onClick={endPickeat} />
      </S.Wrapper>
    </S.Container>
  );
}

export default PickeatEndConfirm;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.body.xlarge};
    text-align: center;
  `,
  Title: styled.p`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
