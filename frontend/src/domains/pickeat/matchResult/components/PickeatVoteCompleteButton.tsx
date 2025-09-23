import Button from '@components/actions/Button';

import { participants } from '@apis/participants';

import { useEffect, useState } from 'react';

type Props = {
  onVoteComplete: () => void;
  onClick?: () => void;
};

function PickeatVoteCompleteButton({ onVoteComplete, onClick }: Props) {
  const [loading, setLoading] = useState(false);

  const handleVoteCompleteClick = async () => {
    if (loading) return;
    onClick?.();
    setLoading(true);
    try {
      // TODO : 투표 버튼에 쓰로틀링과 로딩 UI 안에 넣어서 서버 통신임을 나타내기
      await participants.patchComplete();
      alert('투표 완료 상태가 되었습니다. (계속 투표에 참여하실 수 있습니다.)');
      onVoteComplete();
    } catch {
      alert('투표 완료 상태 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMyStatus = async () => {
      try {
        const { isCompleted } = await participants.getMyStatus();
        if (isCompleted) onVoteComplete();
      } catch {
        alert(
          '내 투표 상태를 불러오는데 실패했습니다. 새로고침 후 다시 시도해주세요.'
        );
      }
    };
    fetchMyStatus();
  }, []);

  return (
    <Button
      onClick={handleVoteCompleteClick}
      aria-disabled={loading}
      text="투표 완료하기"
      disabled={loading}
      color="primary"
    />
  );
}

export default PickeatVoteCompleteButton;
