import Button from '@components/actions/Button';

import { participants } from '@apis/participants';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

function VoteCompleteButton() {
  const [voteCompleted, setVoteCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVoteCompleteClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // TODO : 투표 버튼에 쓰로틀링과 로딩 UI 안에 넣어서 서버 통신임을 나타내기
      await participants.patchComplete();
      alert('투표 완료 상태가 되었습니다. (계속 투표에 참여하실 수 있습니다.)');
      setVoteCompleted(true);
    } catch {
      alert('투표 완료 상태 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
      // TODO : 투표를 완료하였습니다 / 투표 완료를 해제하였습니다 토스트 메시지 추가
    }
  };

  useEffect(() => {
    const fetchMyStatus = async () => {
      try {
        const { isCompleted } = await participants.getMyStatus();
        setVoteCompleted(isCompleted);
      } catch {
        alert(
          '내 투표 상태를 불러오는데 실패했습니다. 새로고침 후 다시 시도해주세요.'
        );
      }
    };
    fetchMyStatus();
  }, []);

  return (
    <S.Container onClick={handleVoteCompleteClick} aria-disabled={loading}>
      <Button
        text={voteCompleted ? '투표 참여완료!' : '투표 완료하기'}
        disabled={loading || voteCompleted}
        color={voteCompleted ? 'gray' : 'primary'}
      />
    </S.Container>
  );
}

export default VoteCompleteButton;

const S = {
  Container: styled.div`
    width: 120px;
    height: fit-content;
    cursor: pointer;
  `,
};
