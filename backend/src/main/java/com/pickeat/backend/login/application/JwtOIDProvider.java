package com.pickeat.backend.login.application;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtOIDProvider {

    private final ObjectMapper objectMapper;

    public Long extractProviderIdFromIdToken(String idToken) {
        //TODO : kakao ID token 유효성 검사 적용 전

        try {
            String[] parts = idToken.split("\\.");
            if (parts.length != 3) {
                throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
            }

            //TODO: kId 를 통한 RSA 대칭 키 검증 구현 필요. Nimbus 라이브러리 도입 여부 팀원들과 의논할 것
            String kId = extractKid(parts[0]);

            //TODO: 서명 검증 없이 Payload 읽는 중이기에 앞의 todo 해결 후 적용
            String payload = parts[1];
            byte[] decoded = Base64.getUrlDecoder().decode(payload);
            JsonNode json = objectMapper.readTree(decoded);

            return json.get("sub").asLong();
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    private String extractKid(String header) {
        String headerJson = new String(Base64.getUrlDecoder().decode(header), StandardCharsets.UTF_8);
        try {
            JsonNode json = objectMapper.readTree(headerJson);
            return json.get("kid").asText();
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
