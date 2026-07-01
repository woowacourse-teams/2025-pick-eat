package com.pickeat.backend.global.exception;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler globalExceptionHandler;

    @BeforeEach
    void beforeEach() {
        globalExceptionHandler = new GlobalExceptionHandler();
    }

    @Nested
    class BusinessException_처리_케이스 {

        @Test
        void 일반_비즈니스_예외_발생시_해당_에러코드의_상태와_메시지로_응답() {
            // given
            BusinessException exception = new BusinessException(ErrorCode.PICKEAT_NOT_FOUND);

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleBusinessException(exception);

            // then
            assertAll(
                    () -> assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value()),
                    () -> assertThat(problemDetail.getTitle()).isEqualTo(ErrorCode.PICKEAT_NOT_FOUND.name()),
                    () -> assertThat(problemDetail.getDetail()).isEqualTo(ErrorCode.PICKEAT_NOT_FOUND.getMessage())
            );
        }

        @Test
        void 인증_실패_예외_발생시_401_상태로_응답() {
            // given
            BusinessException exception = new BusinessException(ErrorCode.SIGN_UP_REQUIRED);

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleBusinessException(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
        }

        @Test
        void 권한_없음_예외_발생시_403_상태로_응답() {
            // given
            BusinessException exception = new BusinessException(ErrorCode.PICKEAT_ACCESS_DENIED);

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleBusinessException(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
        }
    }

    @Nested
    class ExternalApiException_처리_케이스 {

        @Test
        void 외부_API_5xx_에러_발생시_해당_상태로_응답() {
            // given
            ExternalApiException exception = new ExternalApiException(
                    "외부 서버 오류", "kakao", HttpStatus.BAD_GATEWAY);

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleExternalApiException(exception);

            // then
            assertAll(
                    () -> assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.BAD_GATEWAY.value()),
                    () -> assertThat(problemDetail.getDetail()).isEqualTo("외부 서버 오류")
            );
        }

        @Test
        void 외부_API_4xx_에러_발생시_해당_상태로_응답() {
            // given
            ExternalApiException exception = new ExternalApiException(
                    "잘못된 요청", "google", HttpStatus.BAD_REQUEST);

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleExternalApiException(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }
    }

    @Nested
    class ExternalApiConnectionException_처리_케이스 {

        @Test
        void 외부_API_연결_실패시_503_상태로_응답() {
            // given
            ExternalApiConnectionException exception =
                    new ExternalApiConnectionException("연결 실패", "kakao");

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleExternalApiConnectionException(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.SERVICE_UNAVAILABLE.value());
        }
    }

    @Nested
    class 입력값_검증_예외_처리_케이스 {

        @Test
        void MethodArgumentNotValidException_발생시_필드에러_목록을_포함하여_400_상태로_응답() {
            // given
            MethodParameter methodParameter = new MethodParameter(
                    GlobalExceptionHandlerTest.class.getDeclaredMethods()[0], -1);
            BindingResult bindingResult = mock(BindingResult.class);
            FieldError fieldError = new FieldError("request", "name", "이름은 필수입니다.");
            when(bindingResult.getFieldErrors()).thenReturn(List.of(fieldError));
            MethodArgumentNotValidException exception =
                    new MethodArgumentNotValidException(methodParameter, bindingResult);

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleValidationExceptions(exception);

            // then
            assertAll(
                    () -> assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value()),
                    () -> assertThat(problemDetail.getProperties())
                            .extractingByKey("fieldErrors")
                            .isEqualTo(java.util.Map.of("name", "이름은 필수입니다."))
            );
        }
    }

    @Nested
    class 잘못된_요청_형식_처리_케이스 {

        @Test
        void 지원하지_않는_HTTP_메서드_요청시_400_상태로_응답() {
            // given
            HttpRequestMethodNotSupportedException exception =
                    new HttpRequestMethodNotSupportedException("PATCH");

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleWrongRequest(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        void 존재하지_않는_리소스_요청시_400_상태로_응답() {
            // given
            NoResourceFoundException exception =
                    new NoResourceFoundException(org.springframework.http.HttpMethod.GET, "/no-such-path");

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleWrongRequest(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        void 지원하지_않는_미디어타입_요청시_400_상태로_응답() {
            // given
            HttpMediaTypeNotSupportedException exception =
                    new HttpMediaTypeNotSupportedException("text/plain");

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleWrongMediaType(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        void 잘못된_멀티파트_요청시_400_상태로_응답() {
            // given
            MultipartException exception = new MultipartException("잘못된 multipart 요청입니다.");

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleInvalidMultiPartFormRequest(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        void 멀티파트_요청_파트_누락시_400_상태로_응답() {
            // given
            MissingServletRequestPartException exception =
                    new MissingServletRequestPartException("image");

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleInvalidRequestFormat(exception);

            // then
            assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }
    }

    @Nested
    class 예상치_못한_예외_처리_케이스 {

        @Test
        void 처리되지_않은_예외_발생시_500_상태로_응답() {
            // given
            RuntimeException exception = new RuntimeException("예상치 못한 오류");

            // when
            ProblemDetail problemDetail = globalExceptionHandler.handleGeneralException(exception);

            // then
            assertAll(
                    () -> assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value()),
                    () -> assertThat(problemDetail.getDetail()).isEqualTo("예상치 못한 오류가 발생했습니다.")
            );
        }
    }
}
