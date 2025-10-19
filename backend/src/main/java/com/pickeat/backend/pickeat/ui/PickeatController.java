package com.pickeat.backend.pickeat.ui;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.global.auth.annotation.ParticipantInPickeat;
import com.pickeat.backend.global.auth.info.ParticipantInfo;
import com.pickeat.backend.global.log.BusinessLogging;
import com.pickeat.backend.pickeat.application.PickeatResultService;
import com.pickeat.backend.pickeat.application.PickeatService;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatRejoinAvailableResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResultCreationResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import com.pickeat.backend.pickeat.ui.api.PickeatApiSpec;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResultResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PickeatController implements PickeatApiSpec {

    private final PickeatService pickeatService;
    private final PickeatResultService pickeatResultService;

    @Override
    @PostMapping("/pickeats")
    public ResponseEntity<PickeatResponse> createPickeatWithoutRoom(@Valid @RequestBody PickeatRequest request) {
        PickeatResponse response = pickeatService.createPickeatWithoutRoom(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //TODO: 유저 권한이 필요한 API에 대해 인터셉터 혹은 필터단에서 early return 하게 하기  (2025-08-5, 화, 2:35)
    @Override
    @BusinessLogging("방에서 픽잇 생성")
    @PostMapping("/rooms/{roomId}/pickeats")
    public ResponseEntity<PickeatResponse> createPickeatWithRoom(
            @PathVariable("roomId") Long roomId,
            @LoginUserId Long userId,
            @Valid @RequestBody PickeatRequest request) {
        PickeatResponse response = pickeatService.createPickeatWithRoom(roomId, userId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    @GetMapping("/pickeats/{pickeatCode}/participants/state")
    public ResponseEntity<ParticipantStateResponse> getParticipantStateSummary(
            @PathVariable("pickeatCode") String pickeatCode) {
        ParticipantStateResponse response = pickeatService.getParticipantStateSummary(pickeatCode);
        return ResponseEntity.ok().body(response);
    }

    @Override
    @GetMapping("/pickeats/{pickeatCode}")
    public ResponseEntity<PickeatResponse> getPickeat(@PathVariable("pickeatCode") String pickeatCode) {
        PickeatResponse response = pickeatService.getPickeat(pickeatCode);
        return ResponseEntity.ok().body(response);
    }

    @Override
    @PostMapping("/pickeats/{pickeatCode}/result")
    public ResponseEntity<RestaurantResultResponse> createPickeatResult(
            @PathVariable("pickeatCode") String pickeatCode,
            @ParticipantInPickeat ParticipantInfo participantInfo
    ) {
        PickeatResultCreationResponse response = pickeatResultService.createPickeatResult(pickeatCode,
                participantInfo.id());

        HttpStatus status = response.isNewlyCreated() ? HttpStatus.CREATED : HttpStatus.OK;
        return ResponseEntity.status(status).body(response.result());
    }

    @Override
    @GetMapping("/pickeats/{pickeatCode}/result")
    public ResponseEntity<RestaurantResultResponse> getPickeatResult(
            @PathVariable("pickeatCode") String pickeatCode
    ) {
        RestaurantResultResponse response = pickeatResultService.getPickeatResult(pickeatCode);
        return ResponseEntity.ok().body(response);
    }

    @Override
    @GetMapping("/pickeats/{pickeatCode}/state")
    public ResponseEntity<PickeatStateResponse> getPickeatState(
            @PathVariable("pickeatCode") String pickeatCode
    ) {
        PickeatStateResponse response = pickeatService.getPickeatState(pickeatCode);
        return ResponseEntity.ok().body(response);
    }

    @Override
    @GetMapping("/room/{roomId}/pickeats")
    public ResponseEntity<List<PickeatResponse>> getPickeatInRoom(
            @PathVariable("roomId") Long roomId,
            @LoginUserId Long userId
    ) {
        List<PickeatResponse> responses = pickeatService.getPickeatInRoom(roomId, userId);
        return ResponseEntity.ok().body(responses);
    }

    @Override
    @GetMapping("/room/{roomId}/pickeats/active")
    public ResponseEntity<List<PickeatResponse>> getActivePickeatsInRoom(
            @PathVariable("roomId") Long roomId,
            @LoginUserId Long userId
    ) {
        List<PickeatResponse> responses = pickeatService.getActivePickeatInRoom(roomId, userId);
        return ResponseEntity.ok().body(responses);
    }

    @Override
    @PatchMapping("/pickeats/{pickeatCode}/deactive")
    public ResponseEntity<Void> deactivatePickeat(
            @PathVariable("pickeatCode") String pickeatCode,
            @ParticipantInPickeat ParticipantInfo participantInfo
    ) {
        pickeatService.deactivatePickeat(pickeatCode, participantInfo.id());
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/pickeats/{pickeatCode}/rejoin-available")
    public ResponseEntity<PickeatRejoinAvailableResponse> getRejoinAvailableFromNoneUser(
            @PathVariable("pickeatCode") String pickeatCode,
            @ParticipantInPickeat(required = false) ParticipantInfo participantInfo
    ) {
        PickeatRejoinAvailableResponse rejoinAvailable =
                pickeatService.getRejoinAvailableToPickeat(pickeatCode, participantInfo.id());
        return ResponseEntity.ok(rejoinAvailable);
    }

    @Override
    @GetMapping("/rooms/pickeats")
    public ResponseEntity<List<PickeatResponse>> getPickeatsByUser(
            @LoginUserId Long userId
    ) {
        List<PickeatResponse> pickeats = pickeatService.getPickeatsByUser(userId);
        return ResponseEntity.ok().body(pickeats);
    }

    @Override
    @GetMapping("/pickeats/participating")
    public ResponseEntity<PickeatResponse> getPickeatsByParticipant(
            @ParticipantInPickeat ParticipantInfo participantInfo
    ) {
        PickeatResponse pickeat = pickeatService.getPickeatsByParticipant(participantInfo.id());
        return ResponseEntity.ok().body(pickeat);
    }
}
