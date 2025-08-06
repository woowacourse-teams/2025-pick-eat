package com.pickeat.backend.global.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.core.convert.ConversionFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ProblemDetail handleBusinessException(BusinessException e) {
        ErrorCode errorCode = e.getErrorCode();
        ProblemDetail problemDetail = ProblemDetail.forStatus(errorCode.getStatus());
        problemDetail.setTitle(errorCode.name());
        problemDetail.setDetail(e.getMessage());

        return problemDetail;
    }

    @ExceptionHandler(ExternalApiException.class)
    public ProblemDetail handleExternalApiException(ExternalApiException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(e.getHttpStatus());
        problemDetail.setTitle(e.getHttpStatus().name());
        //TODO: 사용자 메시지 노출 여부 고민고민  (2025-07-21, 월, 16:47)
        problemDetail.setDetail(e.getMessage());

        return problemDetail;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationExceptions(MethodArgumentNotValidException e) {
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
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle(HttpStatus.BAD_REQUEST.name());
        problemDetail.setDetail("요청 파라미터 형식이 잘못되었습니다.");
        return problemDetail;
    }

    @ExceptionHandler({HttpMessageNotReadableException.class, MissingServletRequestPartException.class})
    public ProblemDetail handleInvalidRequestFormat(Exception e) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle(HttpStatus.BAD_REQUEST.name());
        problemDetail.setDetail("요청 형식이 잘못되었습니다.");
        return problemDetail;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneralException(Exception e) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        //problemDetail.setTitle(HttpStatus.INTERNAL_SERVER_ERROR.name());
        //TODO: 로깅 적용후 삭제  (2025-08-6, 수, 13:18)
        problemDetail.setTitle(e.getMessage());
        problemDetail.setDetail("예상치 못한 오류가 발생했습니다.");
        return problemDetail;
    }
}
