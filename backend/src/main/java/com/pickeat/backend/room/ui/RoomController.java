package com.pickeat.backend.room.ui;

import com.pickeat.backend.room.application.RoomService;
import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    //TODO: [P0] 토큰 받아서 RoomUser에 방 만든 회원 추가하기  (2025-08-1, 금, 13:32)
    @PostMapping
    public ResponseEntity<RoomResponse> create(@RequestBody RoomRequest request, Long userId) {
        RoomResponse response = roomService.createRoom(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> get(@PathVariable("roomId") Long roomId) {
        RoomResponse response = roomService.getRoom(roomId);
        return ResponseEntity.ok(response);
    }

    //TODO: [P0] 토큰 받아서 그 회원의 방만 반환하게하기 (2025-08-1, 금, 14:3)
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAll(Long userId) {
        List<RoomResponse> response = roomService.getAllRoom(userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{roomId}/invite")
    public ResponseEntity<Void> invite(@PathVariable("roomId") Long roomId,
                                       @RequestBody RoomInvitationRequest request) {
        roomService.inviteUsers(roomId, request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
