package com.pickeat.backend.room.application;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.application.dto.request.ParticipantRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantResponse;
import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Participant;
import com.pickeat.backend.room.domain.Radius;
import com.pickeat.backend.room.domain.Room;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(ParticipantService.class)
class ParticipantServiceTest {

    @Autowired
    private ParticipantService participantService;

    @Autowired
    private TestEntityManager testEntityManager;

    @Nested
    class 참가자_생성_케이스 {

        @Test
        void 참가자_생성_성공() {
            // given
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);
            Room room = new Room(name, location, radius);
            Long roomId = (Long) testEntityManager.persistAndGetId(room);
            Integer pastCount = room.getParticipantCount();

            ParticipantRequest request = new ParticipantRequest("테스트유저", roomId);

            // when
            ParticipantResponse response = participantService.createParticipant(request);

            // then
            Participant savedParticipant = testEntityManager.find(Participant.class, response.id());

            assertThat(savedParticipant).isNotNull();
            assertThat(room.getParticipantCount()).isEqualTo(pastCount + 1);
        }

        @Test
        void 존재하지_않는_방의_참가자_생성시_예외() {
            // given
            // when & then
            ParticipantRequest request = new ParticipantRequest("테스트유저", Long.MAX_VALUE);
            assertThatThrownBy(() -> participantService.createParticipant(request))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.ROOM_NOT_FOUND.getMessage());
        }
    }
}
