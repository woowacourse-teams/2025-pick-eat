package com.pickeat.backend.pickeat.domain;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.UUID;
import lombok.Getter;

@Embeddable
@Getter
public class PickeatCode {

    private final static int UUID_LENGTH = 36;

    @Column(name = "code", nullable = false, unique = true, columnDefinition = "BINARY(16)")
    private UUID value;

    public PickeatCode() {
        this.value = UUID.randomUUID();
    }

    public PickeatCode(String code) {
        this.value = parsePickeatCode(code);
    }

    private UUID parsePickeatCode(String pickeatCode) {
        if (pickeatCode.length() != UUID_LENGTH) {
            throw new BusinessException(ErrorCode.INVALID_PICKEAT_CODE);
        }

        try {
            return UUID.fromString(pickeatCode);
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.INVALID_PICKEAT_CODE);
        }
    }

    @Override
    public String toString() {
        return value.toString();
    }
}
