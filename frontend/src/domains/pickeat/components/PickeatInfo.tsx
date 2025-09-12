import Button from '@components/actions/Button';
import Input from '@components/actions/Input';
import Share from '@components/assets/icons/Share';
import ErrorMessage from '@components/errors/ErrorMessage';
import QRCode from '@components/share/QRCode';

import { PickeatType } from '@apis/pickeat';

import { useGA } from '@hooks/useGA';

import { copyLink } from '@utils/copyLink';

import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FormEvent, use } from 'react';

import { useJoinPickeat } from '../hooks/useJoinPickeat';

type Props = {
  pickeatData: Promise<PickeatType>;
  defaultNickname: string;
};

function PickeatInfo({ pickeatData, defaultNickname }: Props) {
  const pickeatDetail = use(pickeatData);
  const { joinPickeat, error } = useJoinPickeat(pickeatDetail);

  const submitJoinPickeatForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nickname = formData.get('nickname') as string;
    joinPickeat(nickname);
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'form_button',
      label: '픽잇 입장 버튼',
      value: 1,
    });
  };

  const handleLinkShareClick = () => {
    copyLink(window.location.href);
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '픽잇 링크 공유 버튼',
      value: 1,
    });
  };

  return (
    <S.Wrapper onSubmit={submitJoinPickeatForm}>
      <S.PickeatName>{pickeatDetail.name}</S.PickeatName>
      <S.Description>함께 픽잇하고 싶은 친구에게 공유해보세요!</S.Description>
      <QRCode url={pickeatLink} />
      <S.FormWrapper>
        <Input
          defaultValue={defaultNickname}
          name="nickname"
          label="닉네임 입력"
          placeholder="사용하실 닉네임을 입력하세요."
        />
        <ErrorMessage message={error} />

        <Button text="입장" />
      </S.FormWrapper>

      <Button
        type="button"
        leftIcon={<Share size="sm" />}
        text="링크공유"
        color="secondary"
        onClick={handleLinkShareClick}
      />
    </S.Wrapper>
  );
}

export default PickeatInfo;

const S = {
  Wrapper: styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level4};
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p10};

    border-radius: ${({ theme }) => theme.RADIUS.xlarge};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level3};

    ${setMobileStyle(css`
      width: 100%;
      box-shadow: none;
    `)}
  `,

  PickeatName: styled.h1`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,

  Description: styled.p``,

  LocationInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};

    padding: 5%;

    border: 2px solid ${({ theme }) => theme.PALETTE.secondary[30]};
    border-radius: ${({ theme }) => theme.RADIUS.medium3};
  `,

  TitleWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
  `,

  Location: styled.span``,
  Radius: styled.span``,

  FormWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
};
