package com.pickeat.backend.global.version;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.web.method.HandlerMethod;

class DeprecationInterceptorTest {

    @Deprecated
    static class DeprecatedController {

        void handle() {
        }
    }

    static class ActiveController {

        void handle() {
        }
    }

    private ApiVersionManager apiVersionManager;
    private DeprecationInterceptor deprecationInterceptor;
    private HttpServletRequest request;
    private HttpServletResponse response;

    @BeforeEach
    void beforeEach() {
        apiVersionManager = mock(ApiVersionManager.class);
        deprecationInterceptor = new DeprecationInterceptor(apiVersionManager);
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
    }

    private HandlerMethod handlerMethodOf(Class<?> controllerClass) throws NoSuchMethodException {
        Object bean = mock(controllerClass);
        return new HandlerMethod(bean, controllerClass.getDeclaredMethod("handle"));
    }

    @Nested
    class preHandle_케이스 {

        @Test
        void 핸들러가_HandlerMethod가_아니면_헤더없이_통과한다() {
            // given
            Object notHandlerMethod = new Object();

            // when
            boolean result = deprecationInterceptor.preHandle(request, response, notHandlerMethod);

            // then
            assertThat(result).isTrue();
            verify(response, never()).setHeader(org.mockito.ArgumentMatchers.anyString(), org.mockito.ArgumentMatchers.anyString());
        }

        @Test
        void Deprecated_어노테이션이_없는_컨트롤러는_헤더를_추가하지_않는다() throws Exception {
            // given
            HandlerMethod handlerMethod = handlerMethodOf(ActiveController.class);
            when(request.getRequestURI()).thenReturn("/api/v1/restaurants");

            // when
            boolean result = deprecationInterceptor.preHandle(request, response, handlerMethod);

            // then
            assertThat(result).isTrue();
            verify(response, never()).setHeader(org.mockito.ArgumentMatchers.eq("Deprecation"), org.mockito.ArgumentMatchers.anyString());
        }

        @Test
        void Deprecated_컨트롤러이지만_요청버전이_deprecated가_아니면_헤더를_추가하지_않는다() throws Exception {
            // given
            HandlerMethod handlerMethod = handlerMethodOf(DeprecatedController.class);
            when(request.getRequestURI()).thenReturn("/api/v2/restaurants");
            when(apiVersionManager.isDeprecated("v2")).thenReturn(false);

            // when
            boolean result = deprecationInterceptor.preHandle(request, response, handlerMethod);

            // then
            assertThat(result).isTrue();
            verify(response, never()).setHeader(org.mockito.ArgumentMatchers.eq("Deprecation"), org.mockito.ArgumentMatchers.anyString());
        }

        @Test
        void Deprecated_컨트롤러이고_요청버전이_deprecated이면_Deprecation_Link_헤더를_추가한다() throws Exception {
            // given
            HandlerMethod handlerMethod = handlerMethodOf(DeprecatedController.class);
            when(request.getRequestURI()).thenReturn("/api/v1/restaurants");
            when(apiVersionManager.isDeprecated("v1")).thenReturn(true);
            when(apiVersionManager.getVersionInfo("v1"))
                    .thenReturn(new ApiVersionProperties.VersionInfo("v1", "2026-01-01", "v2"));

            // when
            boolean result = deprecationInterceptor.preHandle(request, response, handlerMethod);

            // then
            assertThat(result).isTrue();
            verify(response).setHeader("Deprecation", "@2026-01-01");
            verify(response).setHeader("Link", "</api/v2/restaurants>; rel=\"alternate\"");
        }

        @Test
        void migrateTo가_없으면_최신버전으로_alternate_URL을_생성한다() throws Exception {
            // given
            HandlerMethod handlerMethod = handlerMethodOf(DeprecatedController.class);
            when(request.getRequestURI()).thenReturn("/api/v1/restaurants");
            when(apiVersionManager.isDeprecated("v1")).thenReturn(true);
            when(apiVersionManager.getVersionInfo("v1"))
                    .thenReturn(new ApiVersionProperties.VersionInfo("v1", "2026-01-01", null));
            when(apiVersionManager.getLatestVersion()).thenReturn("v2");

            // when
            deprecationInterceptor.preHandle(request, response, handlerMethod);

            // then
            verify(response).setHeader("Link", "</api/v2/restaurants>; rel=\"alternate\"");
        }
    }
}
