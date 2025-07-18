package com.pickeat.backend.room.ui;

import com.pickeat.backend.room.application.ParticipantService;
import com.pickeat.backend.room.application.dto.request.ParticipantRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantResponse;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/participants")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;

    @PostMapping
    public ResponseEntity<ParticipantResponse> createParticipant(@RequestBody ParticipantRequest request) {
        ParticipantResponse participant = participantService.createParticipant(request);

        String location = "/api/v1/participants/" + participant.id();
        return ResponseEntity.created(URI.create(location))
                .body(participant);
    }
}
