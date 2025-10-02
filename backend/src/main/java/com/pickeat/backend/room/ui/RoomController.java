package com.pickeat.backend.room.ui;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.global.config.annotation.DeprecatedApi;
import com.pickeat.backend.global.log.BusinessLogging;
import com.pickeat.backend.room.application.RoomService;
import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.ui.api.RoomApiSpec;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Deprecated
@DeprecatedApi(
        since = " Fri, 24 Oct 2025 23:59:59 GMT",
        sunset = "Fri, 28 Nov 2025 23:59:59 GMT",
        alternateUrl = "/api/v2/rooms"
)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rooms")
public class RoomController implements RoomApiSpec {

    private final RoomService roomService;

    @Override
    @PostMapping
    @BusinessLogging("방 생성")
    public ResponseEntity<RoomResponse> create(
            @Valid @RequestBody RoomRequest request,
            @LoginUserId Long userId
    ) {
        RoomResponse response = roomService.createRoom(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> get(
            @PathVariable("roomId") Long roomId,
            @LoginUserId Long userId
    ) {
        RoomResponse response = roomService.getRoom(roomId, userId);
        return ResponseEntity.ok(response);
    }

    @Override
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAll(@LoginUserId Long userId) {
        List<RoomResponse> response = roomService.getAllRoom(userId);
        return ResponseEntity.ok(response);
    }

    @Override
    @BusinessLogging("방 초대")
    @PostMapping("/{roomId}/invite")
    public ResponseEntity<Void> invite(@PathVariable("roomId") Long roomId,
                                       @LoginUserId Long userId,
                                       @Valid @RequestBody RoomInvitationRequest request
    ) {
        roomService.inviteUsers(roomId, userId, request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    @DeleteMapping("/{roomId}/exit")
    public ResponseEntity<Void> exit(@PathVariable("roomId") Long roomId, @LoginUserId Long userId) {
        roomService.exitRoom(roomId, userId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
