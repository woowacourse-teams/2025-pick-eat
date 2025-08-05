import { User } from '@apis/users';

import styled from '@emotion/styled';
import { use } from 'react';

const profileUrl = null;

function Profile({ user }: { user: Promise<User | null> }) {
  const profile = use(user);
  return (
    <S.Container>
      <S.ProfileImage
        src={profileUrl || '/images/person.svg'}
        alt="프로필"
        onError={e => (e.currentTarget.src = '/images/person.svg')}
      />
      <S.NickName>{profile?.nickName}</S.NickName>
    </S.Container>
  );
}

export default Profile;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level6};
  `,

  ProfileImage: styled.img`
    width: 150px;
    height: 150px;

    background-color: ${({ theme }) => theme.PALETTE.gray[30]};
    border-radius: ${({ theme }) => theme.RADIUS.half};
    object-fit: cover;
  `,

  NickName: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,
};
