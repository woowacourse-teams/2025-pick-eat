import Button from '@components/actions/Button';
import Chip from '@components/labels/Chip';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useInviteMember } from '@domains/room/hooks/useInviteMember';

import { room } from '@apis/room';
import { User } from '@apis/users';

import { useShowToast } from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { use } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import ContentTitle from './components/ContentTitle';
import InviteMember from './InviteMember';

function IncludeMemberList({ members }: { members: Promise<User[]> }) {
  const memberList = use(members);
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const navigate = useNavigate();
  const showToast = useShowToast();

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
      showToast({ mode: 'SUCCESS', message: '초대 완료!' });
      navigate(0);
    } catch {
      showToast({
        mode: 'ERROR',
        message: '초대에 실패했습니다. 다시 시도해 주세요.',
      });
    }
  };

  return (
    <>
      <ContentTitle
        title={`멤버(${memberList.length})`}
        description="함께할 멤버를 초대해보세요!"
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
      <S.List>
        {memberList.map(member => (
          <S.Member key={member.id}>
            <Chip size="lg">{member.nickname}</Chip>
          </S.Member>
        ))}
        <S.MemberAddButton onClick={handleOpenModal}>
          <Chip size="lg" color="primary">
            <S.ButtonText>+</S.ButtonText>
          </Chip>
        </S.MemberAddButton>
      </S.List>
    </>
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

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
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
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Member: styled.li``,
  MemberAddButton: styled.button``,
  ButtonText: styled.span`
    padding: 0 ${({ theme }) => theme.PADDING.p4};

    font: ${({ theme }) => theme.FONTS.body.xsmall_bold};
  `,
};
