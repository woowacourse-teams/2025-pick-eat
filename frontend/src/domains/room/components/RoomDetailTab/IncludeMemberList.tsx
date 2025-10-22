import NewButton from '@components/actions/NewButton';
import Chip from '@components/labels/Chip';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useInviteMember } from '@domains/room/hooks/useInviteMember';

import { roomQuery } from '@apis/room';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

import ContentTitle from './components/ContentTitle';
import InviteMember from './InviteMember';

function IncludeMemberList() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const { data } = roomQuery.useGetIncludeMembers(roomId);

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
    handleClearSelectedMember,
  } = useInviteMember();

  const { mutate } = roomQuery.usePostMember(roomId);

  const handleInvite = () => {
    mutate({ userIds: selectedMemberList.map(member => member.id) });
    handleUnmountModal();
    handleClearSelectedMember();
  };

  return (
    <>
      <ContentTitle
        title={`멤버(${data.length})`}
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
          <NewButton
            onClick={handleInvite}
            disabled={selectedMemberList.length === 0}
          >
            초대하기
          </NewButton>
        </S.ModalContent>
      </Modal>
      <S.List>
        {data.map(member => (
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
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  List: styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  Member: styled.li``,
  MemberAddButton: styled.button``,
  ButtonText: styled.span`
    padding: 0 ${({ theme }) => theme.PADDING.p4};

    font: ${({ theme }) => theme.FONTS.body.xsmall_bold};
  `,
};
