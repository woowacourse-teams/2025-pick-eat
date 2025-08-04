import styled from '@emotion/styled';

const profileUrl = null;
// 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA1MDhfMjkw%2FMDAxNzQ2NjU5NDYxOTA1.uYCrdfFfAfSHkb3ib2iud2A6FUetQSy65pN0SgiOEg4g.n0EUNkdAG-No6-IK1TV8K8D27rIdrU9OBIeU_KrcV7Ag.PNG%2Fimage.png&type=sc960_832';

function Profile() {
  return (
    <S.Container>
      <S.ProfileImage
        src={profileUrl || '/images/person.svg'}
        alt="프로필"
        onError={e => (e.currentTarget.src = '/images/person.svg')}
      />
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
