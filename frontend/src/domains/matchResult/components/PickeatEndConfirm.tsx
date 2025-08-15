import Button from '@components/actions/Button';

import { pickeat } from '@apis/pickeat';

import { useGA } from '@hooks/useGA';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import PickeatDecisionInfo from './PickeatDecisionInfo';

type Props = {
  onCancel?: () => void;
  onConfirm?: () => void;
};

function PickeatEndConfirm({
  onCancel = () => {},
  onConfirm = () => {},
}: Props) {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const navigate = useNavigate();

  const endPickeat = async () => {
    onConfirm();
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '결과 페이지 이동 버튼',
      value: 1,
    });
    try {
      await pickeat.postResult(pickeatCode);
      navigate(generateRouterPath.matchResult(pickeatCode));
    } catch {
      return alert('픽잇 결과를 가져오는 데 실패했습니다.');
    }
  };

  return (
    <S.Container>
      <S.Container>
        정말 종료하시겠습니까?
        <Suspense>
          <PickeatDecisionInfo />
        </Suspense>
      </S.Container>
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
    gap: ${({ theme }) => theme.GAP.level5};
    flex-direction: column;
  `,
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
