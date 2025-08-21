package com.pickeat.backend.global.auth;

import com.pickeat.backend.global.auth.annotation.Provider;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@RequiredArgsConstructor
public class ProviderArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String PREFIX = "Bearer ";
    private final JwtProvider jwtProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Provider.class)
                && parameter.getParameterType().equals(ProviderInfo.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        String authHeader = webRequest.getHeader("Authorization");

        //TODO: return null 방식 추가 고려
        if (authHeader == null || !authHeader.startsWith(PREFIX)) {
            throw new BusinessException(ErrorCode.HEADER_IS_EMPTY);
        }

        String token = authHeader.substring(PREFIX.length());

        return jwtProvider.getProviderInfo(token);
    }
}
