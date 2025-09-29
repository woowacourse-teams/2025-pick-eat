import { User } from '@apis/users';

import styled from '@emotion/styled';
import { use } from 'react';

const profileUrl = null;

function Profile({ user }: { user: Promise<User | null> }) {
  const profile = use(user);
  return (
    <S.Container>
      <S.ProfileImage
        src={profileUrl || '/images/profile/cat_profile.svg'}
        alt="프로필"
        onError={e => (e.currentTarget.src = '/images/profile/cat_profile.svg')}
      />
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
  `,

  ProfileImage: styled.img`
    width: 120px;

    object-fit: cover;
  `,

  NickName: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large};
  `,
};
