package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ParticipantService {

    private final PickeatRepository pickeatRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public ParticipantResponse createParticipant(ParticipantRequest request) {
        Pickeat pickeat = findPickeatById(request.pickeatId());
        pickeat.incrementParticipantCount();

        Participant participant = new Participant(request.nickname(), pickeat);
        Participant saved = participantRepository.save(participant);
        return ParticipantResponse.from(saved);
    }

    private Pickeat findPickeatById(Long pickeatId) {
        return pickeatRepository.findById(pickeatId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }
}
