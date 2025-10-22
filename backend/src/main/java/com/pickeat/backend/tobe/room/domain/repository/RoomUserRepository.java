package com.pickeat.backend.tobe.room.domain.repository;

import com.pickeat.backend.room.domain.RoomUser;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("RoomUserRepositoryV2")
public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {

    List<RoomUser> findAllByUserId(Long userId);

    List<RoomUser> findAllByRoomId(Long roomId);

    default List<Long> getAllRoomIdsByUserId(Long userId) {
        return findAllByUserId(userId).stream()
                .map(RoomUser::getRoomId)
                .toList();
    }

    default List<Long> getAllUserIdsByRoomId(Long roomId) {
        return findAllByRoomId(roomId).stream()
                .map(RoomUser::getUserId)
                .toList();
    }

    boolean existsByRoomIdAndUserId(Long roomId, Long userId);

    void deleteByRoomIdAndUserId(Long roomId, Long userId);

    int countByRoomId(Long id);

    interface RoomUserCount {

        Long getRoomId();

        int getCnt();

        static Map<Long, Integer> toMap(List<RoomUserCount> list) {
            return list.stream()
                    .collect(Collectors.toMap(RoomUserCount::getRoomId, RoomUserCount::getCnt));
        }
    }

    @Query("""
              select ru.roomId as roomId, count(ru) as cnt
              from RoomUser ru
              where ru.roomId in :roomIds
              group by ru.roomId
            """)
    List<RoomUserCount> countByRoomIdIn(@Param("roomIds") List<Long> roomIds);

    @Query("""
              select ru.userId
              from RoomUser ru
              where ru.roomId = :roomId
                and ru.userId in :userIds
            """)
    List<Long> findExistingUserIdsInRoom(
            @Param("roomId") Long roomId,
            @Param("userIds") Collection<Long> userIds
    );
}
