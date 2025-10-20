package com.pickeat.backend.global.auth;

import com.pickeat.backend.global.auth.annotation.ParticipantInPickeat;
import com.pickeat.backend.global.auth.principal.ParticipantPrincipal;
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
        return parameter.hasParameterAnnotation(ParticipantInPickeat.class)
                && parameter.getParameterType().equals(ParticipantPrincipal.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {

        ParticipantInPickeat participantInPickeatAnnotation = parameter.getParameterAnnotation(
                ParticipantInPickeat.class);
        boolean required = participantInPickeatAnnotation.required();

        String authHeader = webRequest.getHeader("Pickeat-Participant-Token");

        if (!hasAuthToken(authHeader)) {
            if (required) {
                throw new BusinessException(ErrorCode.HEADER_IS_EMPTY);
            }
            return null;
        }

        return getParticipantIdByHeader(authHeader);
    }

    private boolean hasAuthToken(String authHeader) {
        return authHeader != null && authHeader.startsWith(PREFIX);
    }

    private ParticipantPrincipal getParticipantIdByHeader(String authHeader) {
        String token = authHeader.substring(PREFIX.length());
        Long participantId = participantTokenProvider.getParticipantId(token);
        String rawPickeatCode = participantTokenProvider.getRawPickeatCode(token);
        return new ParticipantPrincipal(participantId, rawPickeatCode);
    }
}
