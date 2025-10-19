import FixedButton from '@components/actions/FixedButton';
import LoadingSpinner from '@components/assets/LoadingSpinner';

import { participantsQuery } from '@apis/participants';

import { useShowToast } from '@provider/ToastProvider';

import { useEffect } from 'react';

type Props = {
  onVoteComplete: () => void;
  onClick?: () => void;
};

function PickeatVoteCompleteButton({ onVoteComplete, onClick }: Props) {
  const showToast = useShowToast();
  const { data } = participantsQuery.useGetMyStatus();
  const { mutate: patchComplete, isPending } =
    participantsQuery.usePatchComplete();

  const handleVoteCompleteClick = () => {
    onClick?.();

    patchComplete(undefined, {
      onSuccess: () => {
        showToast(
          {
            mode: 'SUCCESS',
            message:
              '투표 완료 상태가 되었습니다. (계속 투표에 참여하실 수 있습니다.)',
          },
          3000
        );
        onVoteComplete();
      },
      onError: () => {
        showToast({
          mode: 'ERROR',
          message: '투표 완료 상태 변경에 실패했습니다. 다시 시도해 주세요.',
        });
      },
    });
  };

  //TODO: 에러 처리
  useEffect(() => {
    if (data?.isCompleted) {
      onVoteComplete();
    }
  }, [data, onVoteComplete]);

  return (
    <FixedButton
      onClick={handleVoteCompleteClick}
      aria-disabled={isPending}
      disabled={isPending}
      color="primary"
    >
      {isPending ? <LoadingSpinner /> : '  투표 완료하기'}
    </FixedButton>
  );
}

export default PickeatVoteCompleteButton;
