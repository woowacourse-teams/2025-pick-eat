package com.pickeat.backend.global.exception;

import com.pickeat.backend.global.log.dto.ErrorLog;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.ConversionFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ProblemDetail handleBusinessException(BusinessException e) {
        ErrorCode errorCode = e.getErrorCode();
        HttpStatus status = errorCode.getStatus();

        if (status.isSameCodeAs(HttpStatusCode.valueOf(401)) || status.isSameCodeAs(
                HttpStatusCode.valueOf(403))) {
            logWarn(status, e, errorCode.name());
        } else {
            logInfo(e, errorCode.name());
        }

        ProblemDetail problemDetail = ProblemDetail.forStatus(errorCode.getStatus());
        problemDetail.setTitle(errorCode.name());
        problemDetail.setDetail(e.getMessage());

        return problemDetail;
    }

    @ExceptionHandler(ExternalApiException.class)
    public ProblemDetail handleExternalApiException(ExternalApiException e) {
        HttpStatus status = e.getHttpStatus();

        if (status.is5xxServerError()) {
            logExternalError(e, status);
        } else {
            logWarn(status, e, e.getPlatformName());
        }

        ProblemDetail problemDetail = ProblemDetail.forStatus(e.getHttpStatus());
        problemDetail.setTitle(e.getHttpStatus().name());
        problemDetail.setDetail(e.getMessage());

        return problemDetail;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationExceptions(MethodArgumentNotValidException e) {

        logInfo(e, "INVALID_INPUT");

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST,
                ErrorCode.VALIDATION_FAILED.getMessage()
        );

        problemDetail.setTitle(ErrorCode.VALIDATION_FAILED.name());

        Map<String, String> fieldErrors = new HashMap<>();
        e.getBindingResult().getFieldErrors()
                .forEach(error -> fieldErrors.put(error.getField(), error.getDefaultMessage()));
        problemDetail.setProperty("fieldErrors", fieldErrors);

        return problemDetail;
    }

    @ExceptionHandler({
            MethodArgumentTypeMismatchException.class,
            ConversionFailedException.class
    })
    public ProblemDetail handleTypeMismatchException(Exception e) {
        logInfo(e, "BINDING_ERROR");

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle(HttpStatus.BAD_REQUEST.name());
        problemDetail.setDetail("요청 파라미터 형식이 잘못되었습니다.");
        return problemDetail;
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MissingServletRequestPartException.class})
    public ProblemDetail handleInvalidRequestFormat(Exception e) {
        logInfo(e, "PARSING_ERROR");

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle(HttpStatus.BAD_REQUEST.name());
        problemDetail.setDetail("요청 형식이 잘못되었습니다.");
        return problemDetail;
    }

    @ExceptionHandler({
            HttpRequestMethodNotSupportedException.class,
            NoResourceFoundException.class,
    })
    public ProblemDetail handleWrongRequest(Exception e) {
        logInfo(e, "NO_RESOURCE_FOUND");

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle(HttpStatus.BAD_REQUEST.name());
        problemDetail.setDetail("존재하지 않은 API에 대한 요청입니다. HTTP 메서드와 URL을 다시 확인해주세요.");
        return problemDetail;
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ProblemDetail handleWrongMediaType(Exception e) {
        logInfo(e, "NOT_SUPPORTED_MEDIA");

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle(HttpStatus.BAD_REQUEST.name());
        problemDetail.setDetail("허용하지 않는 미디어타입입니다. 요청 형식을 다시 확인해주세요.");
        return problemDetail;
    }

    @ExceptionHandler(MultipartException.class)
    public ProblemDetail handleInvalidMultiPartFormRequest(Exception e) {
        logInfo(e, "INVALID_MULTIPART");

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle(HttpStatus.BAD_REQUEST.name());
        problemDetail.setDetail("잘못된 multipart/form-data 요청입니다. 요청 형식이나 업로드할 파일의 크기를 다시 확인해주세요.");
        return problemDetail;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneralException(Exception e) {
        logServerError(e);

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        problemDetail.setTitle(HttpStatus.INTERNAL_SERVER_ERROR.name());
        problemDetail.setDetail("예상치 못한 오류가 발생했습니다.");
        return problemDetail;
    }

    private void logServerError(Exception e) {
        logSafe(ErrorLog.createServerErrorLog(500, e, ErrorCode.INTERNAL_SERVER_ERROR.name()), LogLevel.ERROR);
    }

    private void logExternalError(ExternalApiException e, HttpStatus status) {
        logSafe(ErrorLog.createExternalErrorLog(status.value(), e, e.getPlatformName()), LogLevel.ERROR);
    }

    private void logInfo(Exception e, String customCode) {
        logSafe(ErrorLog.createClientErrorLog(400, e, customCode), LogLevel.INFO);
    }

    private void logWarn(HttpStatus status, Throwable e, String customCode) {
        logSafe(ErrorLog.createClientErrorLog(status.value(), e, customCode), LogLevel.WARN);
    }

    private void logSafe(Object logObject, LogLevel level) {

        switch (level) {
            case INFO -> log.info("{}", logObject);
            case WARN -> log.warn("{}", logObject);
            case ERROR -> log.error("{}", logObject);
        }
    }

    private enum LogLevel {INFO, WARN, ERROR}
}
