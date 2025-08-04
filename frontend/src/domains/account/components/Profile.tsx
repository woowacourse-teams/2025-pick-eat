import styled from '@emotion/styled';

function Profile() {
  return (
    <S.Container>
      <S.ProfileImage />
      <S.NickName>머핀</S.NickName>
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

  ProfileImage: styled.div`
    width: 150px;
    height: 150px;
    border-radius: ${({ theme }) => theme.RADIUS.half};
    background-color: ${({ theme }) => theme.PALETTE.gray[30]};
  `,

  NickName: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,
};
