import FixedButton from '@components/actions/FixedButton';
import LoadingSpinner from '@components/assets/LoadingSpinner';

import { participantsQuery } from '@apis/participants';

import { useEffect } from 'react';

type Props = {
  onVoteComplete: () => void;
  onClick?: () => void;
};

function PickeatVoteCompleteButton({ onVoteComplete, onClick }: Props) {
  const { data } = participantsQuery.useGetMyStatus();
  const { mutate: patchComplete, isPending } =
    participantsQuery.usePatchComplete(onVoteComplete);

  const handleVoteCompleteClick = () => {
    onClick?.();

    patchComplete();
  };

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
