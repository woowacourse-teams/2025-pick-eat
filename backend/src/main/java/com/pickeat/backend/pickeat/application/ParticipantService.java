package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.auth.principal.ParticipantPrincipal;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.ParticipantStateUpdatedEvent;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ParticipantService {

    private final PickeatRepository pickeatRepository;
    private final ParticipantRepository participantRepository;
    private final ParticipantTokenProvider participantTokenProvider;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Transactional
    public TokenResponse createParticipant(ParticipantRequest request) {
        Pickeat pickeat = findPickeatById(request.pickeatId());

        Participant participant = new Participant(request.nickname(), pickeat.getId());
        participantRepository.save(participant);

        TokenResponse token = participantTokenProvider.createToken(participant, pickeat);
        applicationEventPublisher.publishEvent(new ParticipantStateUpdatedEvent(pickeat.getId()));
        return token;
    }

    public ParticipantResponse getParticipantBy(Long participantId) {
        Participant participant = getParticipant(participantId);
        return ParticipantResponse.from(participant);
    }

    @Transactional
    public void updateCompletion(ParticipantPrincipal participantPrincipal, boolean isCompleted) {
        Participant participant = getParticipant(participantPrincipal.id());
        participant.updateCompletionAs(isCompleted);
        applicationEventPublisher.publishEvent(new ParticipantStateUpdatedEvent(participant.getPickeatId()));
    }

    private Participant getParticipant(Long participantId) {
        return participantRepository.findById(participantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PARTICIPANT_NOT_FOUND));
    }

    private Pickeat findPickeatById(Long pickeatId) {
        return pickeatRepository.findById(pickeatId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }
}
