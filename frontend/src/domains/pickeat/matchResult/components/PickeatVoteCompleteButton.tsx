import FixedButton from '@components/actions/FixedButton';
import LoadingSpinner from '@components/assets/LoadingSpinner';

import { participantsQuery } from '@apis/participants';

import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

type Props = {
  onVoteComplete: () => void;
  onClick?: () => void;
};

function PickeatVoteCompleteButton({ onVoteComplete, onClick }: Props) {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';

  const { data } = participantsQuery.useGetMyStatus(pickeatCode);
  const { mutate: patchComplete, isPending } =
    participantsQuery.usePatchComplete(pickeatCode, onVoteComplete);

  const handleVoteCompleteClick = () => {
    onClick?.();

    patchComplete();
  };

  useEffect(() => {
    if (!data) return;
    if (data.isCompleted) {
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
