package com.pickeat.backend.room.ui;

import com.pickeat.backend.room.application.RoomService;
import com.pickeat.backend.room.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.application.dto.RoomRequest;
import com.pickeat.backend.room.application.dto.RoomResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomResponse createRoom(@RequestBody RoomRequest request,
                                   HttpServletResponse response) {
        RoomResponse roomResponse = roomService.createRoom(request);

        String location = "/api/v1/rooms/" + roomResponse.code();
        response.setHeader("Location", location);

        return roomResponse;
    }

    @GetMapping("/{roomCode}/participants/state")
    public ParticipantStateResponse getParticipantStateSummary(@PathVariable String roomCode) {
        return roomService.getParticipantStateSummary(roomCode);
    }

    @PatchMapping("/{roomCode}/deactivate")
    public void deactivateRoom(@PathVariable String roomCode) {
        roomService.deactivateRoom(roomCode);
    }
    @GetMapping("/{roomCode}")
    public RoomResponse getRoom(@PathVariable String roomCode) {
        return roomService.getRoom(roomCode);
    }
}
