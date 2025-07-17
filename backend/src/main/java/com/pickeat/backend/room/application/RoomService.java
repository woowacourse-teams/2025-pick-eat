package com.pickeat.backend.room.application;

import com.pickeat.backend.room.application.dto.RoomRequest;
import com.pickeat.backend.room.application.dto.RoomResponse;
import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Radius;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomResponse createRoom(RoomRequest request) {
        Room room = new Room(
                request.name(),
                new Location(request.x(), request.y()),
                new Radius(request.radius())
        );

        Room saved = roomRepository.save(room);
        return RoomResponse.from(saved);
    }
}
