import { useShowToast } from '@provider/ToastProvider';

const useCopyLink = () => {
  const showToast = useShowToast();

  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast({ mode: 'SUCCESS', message: '링크가 복사되었습니다!' });
    } catch (e) {
      console.error(e);
      showToast({ mode: 'ERROR', message: '복사에 실패했습니다.' });
    }
  };

  return copyLink;
};

export default useCopyLink;
