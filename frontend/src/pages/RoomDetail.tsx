import Button from '@components/actions/Button';
import Location from '@components/assets/icons/Location';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import styled from '@emotion/styled';

const MOCK = [
  {
    id: 1,
    nickName: '머핀',
  },
  {
    id: 2,
    nickName: '수이',
  },
  {
    id: 3,
    nickName: '카멜',
  },
];

function RoomDetail() {
  return (
    <S.Container>
      <S.Name>레전드 방</S.Name>
      <S.SelectWrapper>
        <Button text="위시로 픽잇!" leftIcon="🤍" />
        <Button
          text="위치로 픽잇!"
          leftIcon={<Location size="sm" color="white" />}
        />
      </S.SelectWrapper>
      <S.MemberWrapper>
        {/* TODO: 아이콘 추가 */}
        <S.MemberTitleArea>
          <S.Description>멤버(4)</S.Description>
          {/* TODO: 수이가 만든 모달창으로 초대 모달 띄우기, 아이콘 추가 */}
          <Button text="초대" size="sm" color="secondary" />
        </S.MemberTitleArea>
        <S.MemberList>
          {MOCK.map(member => (
            <S.Member key={member.id}>{member.nickName}</S.Member>
          ))}
        </S.MemberList>
      </S.MemberWrapper>
    </S.Container>
  );
}

export default RoomDetail;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};

    padding: 0 ${({ theme }) => theme.PADDING.p7};
  `,

  Name: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  SelectWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,

  MemberWrapper: styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,

  MemberTitleArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Description: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,

  MemberList: styled.ul``,

  Member: styled.li`
    padding: ${({ theme }) => theme.PADDING.p3};
  `,
};
