import Button from '@components/actions/Button';
import People from '@components/assets/icons/People';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { room } from '@apis/room';
import { User } from '@apis/users';

import styled from '@emotion/styled';
import { use } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useInviteMember } from '../hooks/useInviteMember';

import InviteMember from './InviteMember';

function IncludeMemberList({ members }: { members: Promise<User[]> }) {
  const memberList = use(members);
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const navigate = useNavigate();

  const {
    opened,
    mounted,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();
  const {
    selectedMemberList,
    handleAddSelectedMember,
    handleDeleteSelectedMember,
  } = useInviteMember();

  const inviteMember = async () => {
    try {
      await room.postMember(
        roomId,
        selectedMemberList.map(member => member.id)
      );
      alert('초대 완료!');
      navigate(0);
    } catch {
      console.log('초대 실패');
    }
  };

  return (
    <S.Container>
      <S.TitleArea>
        <S.Description>
          <People size="sm" />
          멤버({memberList.length})
        </S.Description>
        <Button
          text="초대"
          size="sm"
          color="secondary"
          onClick={handleOpenModal}
        />
        <Modal
          mounted={mounted}
          opened={opened}
          onClose={handleCloseModal}
          onUnmount={handleUnmountModal}
          size="lg"
        >
          <S.ModalContent>
            <InviteMember
              selectedMemberList={selectedMemberList}
              onAddMember={handleAddSelectedMember}
              onDeleteMember={handleDeleteSelectedMember}
            />
            <Button text="초대하기" onClick={inviteMember} />
          </S.ModalContent>
        </Modal>
      </S.TitleArea>
      <S.List>
        {memberList.map(member => (
          <S.Member key={member.id}>{member.nickname}</S.Member>
        ))}
      </S.List>
    </S.Container>
  );
}
export default IncludeMemberList;

const S = {
  Container: styled.div`
    width: 100%;
    min-height: 40%;

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,

  TitleArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Description: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    font: ${({ theme }) => theme.FONTS.heading.small};
  `,

  ModalContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  List: styled.ul`
    overflow: scroll;
    scrollbar-width: none;
  `,

  Member: styled.li`
    padding: ${({ theme }) => theme.PADDING.p3};
  `,
};
