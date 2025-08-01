package com.pickeat.backend.pickeat.ui;

import com.pickeat.backend.pickeat.application.ParticipantService;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import com.pickeat.backend.pickeat.ui.api.ParticipantApiSpec;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/participants")
@RequiredArgsConstructor
public class ParticipantController implements ParticipantApiSpec {

    private final ParticipantService participantService;

    @Override
    @PostMapping
    public ResponseEntity<ParticipantResponse> createParticipant(@Valid @RequestBody ParticipantRequest request) {
        participantService.createParticipant(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
