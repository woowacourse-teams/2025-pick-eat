package com.pickeat.backend.global.auth;

import com.pickeat.backend.global.auth.annotation.ParticipantId;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.ParticipantTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@RequiredArgsConstructor
public class ParticipantIdArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String PREFIX = "Bearer ";
    private final ParticipantTokenProvider participantTokenProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(ParticipantId.class)
                && parameter.getParameterType().equals(Long.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {

        ParticipantId participantIdAnnotation = parameter.getParameterAnnotation(ParticipantId.class);
        boolean required = participantIdAnnotation.required();

        String authHeader = webRequest.getHeader("Pickeat-Participant-Token");

        if (required) {
            if (isHasAuthToken(authHeader)) {
                return getParticipantIdByHeader(authHeader);
            }
            throw new BusinessException(ErrorCode.HEADER_IS_EMPTY);
        }

        if (isHasAuthToken(authHeader)) {
            return getParticipantIdByHeader(authHeader);
        }
        return null;
    }

    private boolean isHasAuthToken(String authHeader) {
        return authHeader != null && authHeader.startsWith(PREFIX);
    }

    private Long getParticipantIdByHeader(String authHeader) {
        String token = authHeader.substring(PREFIX.length());
        return participantTokenProvider.getParticipantId(token);
    }
}
