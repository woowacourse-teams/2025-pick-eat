package com.pickeat.backend.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WishListService {

    private final WishListRepository wishListRepository;
    private final RoomUserRepository roomUserRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public WishListResponse createWishList(Long roomId, Long userId, WishListRequest request) {
        WishList wishList = new WishList(request.name(), roomId, false);
        validateUserAccessToRoom(wishList.getRoomId(), userId);
        WishList saved = wishListRepository.save(wishList);
        return WishListResponse.from(saved);
    }

    public List<WishListResponse> getWishLists(Long roomId, Long participantId) {
        Participant participant = getParticipant(participantId);
        validateParticipantAccessToRoom(roomId, participant);

        List<WishList> wishLists = new ArrayList<>();
        wishLists.addAll(wishListRepository.findAllByRoomIdAndIsPublic(roomId, false));
        wishLists.addAll(wishListRepository.findAllByIsPublicTrue());
        return WishListResponse.from(wishLists);
    }

    public List<WishResponse> getWishes(Long wishListId, Long participantId) {
        WishList wishList = getWishList(wishListId);
        Participant participant = getParticipant(participantId);
        validateParticipantAccessToRoom(wishList.getRoomId(), participant);

        return WishResponse.from(wishList.getWishes());
    }

    private WishList getWishList(Long wishListId) {
        return wishListRepository.findById(wishListId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISHLIST_NOT_FOUND));
    }

    private Participant getParticipant(Long participantId) {
        return participantRepository.findById(participantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PARTICIPANT_NOT_FOUND));
    }

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.WISH_LIST_ACCESS_DENIED);
        }
    }

    private void validateParticipantAccessToRoom(Long roomId, Participant participant) {
        if (!participant.getPickeat().getRoomId().equals(roomId)) {
            throw new BusinessException(ErrorCode.WISH_LIST_ACCESS_DENIED);
        }
    }
}
