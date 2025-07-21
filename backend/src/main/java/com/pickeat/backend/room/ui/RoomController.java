package com.pickeat.backend.room.ui;

import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.room.application.RoomService;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest request) {
        RoomResponse response = roomService.createRoom(request);
        String location = "/api/v1/rooms/" + response.code();

        return ResponseEntity.created(URI.create(location))
                .body(response);
    }

    @GetMapping("/{roomCode}/participants/state")
    public ResponseEntity<ParticipantStateResponse> getParticipantStateSummary(
            @PathVariable("roomCode") String roomCode) {
        ParticipantStateResponse response = roomService.getParticipantStateSummary(roomCode);
        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/{roomCode}/deactivate")
    public ResponseEntity<Void> deactivateRoom(@PathVariable("roomCode") String roomCode) {
        roomService.deactivateRoom(roomCode);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{roomCode}")
    public ResponseEntity<RoomResponse> getRoom(@PathVariable("roomCode") String roomCode) {
        RoomResponse response = roomService.getRoom(roomCode);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{roomCode}/result")
    public ResponseEntity<List<RestaurantResponse>> getRoomResult(@PathVariable("roomCode") String roomCode) {
        List<RestaurantResponse> response = roomService.getRoomResult(roomCode);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{roomCode}/restaurants")
    public ResponseEntity<List<RestaurantResponse>> getRoomRestaurants(@PathVariable("roomCode") String roomCode) {
        List<RestaurantResponse> response = roomService.getRoomRestaurants(roomCode);
        return ResponseEntity.ok().body(response);
    }
}
