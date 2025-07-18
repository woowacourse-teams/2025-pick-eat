package com.pickeat.backend.room.ui;

import com.pickeat.backend.room.application.ParticipantService;
import com.pickeat.backend.room.application.dto.request.ParticipantRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/participants")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ParticipantResponse createParticipant(@RequestBody ParticipantRequest request,
                                                 HttpServletResponse response) {
        ParticipantResponse participant = participantService.createParticipant(request);

        String location = "/api/v1/participants/" + participant.id();
        response.setHeader("Location", location);
        return participant;
    }
}
