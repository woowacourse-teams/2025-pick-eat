import Button from '@components/actions/Button';
import NewButton from '@components/actions/NewButton';

import { participants } from '@apis/participants';

import { useShowToast } from '@provider/ToastProvider';

import { useEffect, useState } from 'react';

type Props = {
  onVoteComplete: () => void;
  onClick?: () => void;
};

function PickeatVoteCompleteButton({ onVoteComplete, onClick }: Props) {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  const handleVoteCompleteClick = async () => {
    if (loading) return;
    onClick?.();
    setLoading(true);
    try {
      // TODO : 투표 버튼에 쓰로틀링과 로딩 UI 안에 넣어서 서버 통신임을 나타내기
      await participants.patchComplete();
      showToast(
        {
          mode: 'SUCCESS',
          message:
            '투표 완료 상태가 되었습니다. (계속 투표에 참여하실 수 있습니다.)',
        },
        3000
      );
      onVoteComplete();
    } catch {
      showToast({
        mode: 'ERROR',
        message: '투표 완료 상태 변경에 실패했습니다. 다시 시도해 주세요.',
      });
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
        showToast({
          mode: 'ERROR',
          message:
            '내 투표 상태를 불러오는데 실패했습니다. 새로고침 후 다시 시도해 주세요.',
        });
      }
    };
    fetchMyStatus();
  }, []);

  return (
    <NewButton
      onClick={handleVoteCompleteClick}
      aria-disabled={loading}
      disabled={loading}
      color="primary"
      fixed
    >
      투표 완료하기
    </NewButton>
  );
}

export default PickeatVoteCompleteButton;
