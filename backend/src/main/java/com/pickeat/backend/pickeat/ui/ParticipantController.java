package com.pickeat.backend.pickeat.ui;

import com.pickeat.backend.global.auth.annotation.ParticipantInPickeat;
import com.pickeat.backend.global.auth.principal.ParticipantPrincipal;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.ParticipantService;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import com.pickeat.backend.pickeat.ui.api.ParticipantApiSpec;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ParticipantController implements ParticipantApiSpec {

    private final ParticipantService participantService;

    @Override
    @PostMapping("/participants")
    public ResponseEntity<TokenResponse> createParticipant(@Valid @RequestBody ParticipantRequest request) {
        TokenResponse response = participantService.createParticipant(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @Override
    @GetMapping("/participants/me")
    public ResponseEntity<ParticipantResponse> getParticipant(
            @ParticipantInPickeat ParticipantPrincipal participantPrincipal) {
        ParticipantResponse response = participantService.getParticipantBy(participantPrincipal.id());
        return ResponseEntity.ok(response);
    }

    @Override
    @PatchMapping("/participants/me/completion/complete")
    public ResponseEntity<Void> markCompletion(@ParticipantInPickeat ParticipantPrincipal participantPrincipal) {
        participantService.updateCompletion(participantPrincipal.id(), true);
        return ResponseEntity.noContent().build();
    }

    @Override
    @PatchMapping("/participants/me/completion/cancel")
    public ResponseEntity<Void> unMarkCompletion(@ParticipantInPickeat ParticipantPrincipal participantPrincipal) {
        participantService.updateCompletion(participantPrincipal.id(), false);
        return ResponseEntity.noContent().build();
    }
}
