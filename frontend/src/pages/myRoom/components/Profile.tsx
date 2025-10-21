import { usersQuery } from '@apis/users';

import { validate } from '@utils/validate';

import styled from '@emotion/styled';

function Profile() {
  const { data: profile } = usersQuery.useSuspenseGet();
  return (
    <S.Container>
      <S.ProfileImageBox>
        <S.ProfileImage src={'/images/profile/manProfile.png'} alt="프로필" />
      </S.ProfileImageBox>
      <S.NickName>
        {validate.isEmpty(profile.nickname) ? '회원' : profile.nickname}님
      </S.NickName>
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
