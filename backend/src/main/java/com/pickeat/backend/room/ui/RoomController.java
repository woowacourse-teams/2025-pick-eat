package com.pickeat.backend.room.ui;

import com.pickeat.backend.room.application.RoomService;
import com.pickeat.backend.room.application.dto.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.RoomRequest;
import com.pickeat.backend.room.application.dto.RoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public RoomResponse createRoom(@RequestBody RoomRequest request) {
        return roomService.createRoom(request);
    }

    @GetMapping("/{roomCode}/participants/state")
    public ParticipantStateResponse getParticipantStateSummary(@PathVariable String roomCode) {
        return roomService.getParticipantStateSummary(roomCode);
    }

    @PatchMapping("/{roomCode}/deactivate")
    public void createRoom(@PathVariable String roomCode) {
        roomService.deactivateRoom(roomCode);
    }
}
