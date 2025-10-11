import { User } from '@apis/users';

import styled from '@emotion/styled';
import { use } from 'react';

const profileUrl = null;

function Profile({ user }: { user: Promise<User | null> }) {
  const profile = use(user);
  return (
    <S.Container>
      <S.ProfileImageBox>
        <S.ProfileImage
          src={profileUrl || '/images/profile/man_profile.png'}
          alt="프로필"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/profile/manProfile.png';
          }}
        />
      </S.ProfileImageBox>
      <S.NickName>{profile?.nickname ?? '회원'}님</S.NickName>
    </S.Container>
  );
}

export default Profile;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  ProfileImageBox: styled.div`
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};
    border-radius: ${({ theme }) => theme.RADIUS.half};
  `,

  ProfileImage: styled.img`
    width: 140px;

    object-fit: cover;
  `,

  NickName: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
};
