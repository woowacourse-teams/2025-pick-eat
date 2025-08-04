package com.pickeat.backend.login.ui.api;

import com.pickeat.backend.login.application.dto.AuthCodeRequest;
import com.pickeat.backend.login.application.dto.SignupRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;

@Tag(name = "로그인", description = "OAuth 기반 인증 및 회원가입 API")
public interface LoginApiSpec {

    @Operation(
            summary = "인증 코드 처리",
            operationId = "processKakaoCode",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "인가 코드",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthCodeRequest.class),
                            examples = @ExampleObject(value = "{\"code\": \"abc123\"}")
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "기존 유저 - 로그인 가능"),
            @ApiResponse(responseCode = "401", description = "신규 유저 - 회원가입 필요"),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청 데이터 오류",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "VALIDATION_FAILED",
                                              "status": 400,
                                              "detail": "code 값은 null일 수 없습니다."
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> processCode(AuthCodeRequest request, HttpSession session);

    @Operation(
            summary = "로그인 처리",
            operationId = "kakaoLogin"
    )
    //TODO: 현재 헤더를 통해서 JWT를 보내고 있으므로 명확한 API SPEC 수정 필요
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "JWT 토큰 발급 성공",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "로그인 준비 세션 없음",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "title": "FORBIDDEN",
                                              "status": 403,
                                              "detail": "세션 정보가 유효하지 않습니다."
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<String> login(HttpSession session);

    @Operation(
            summary = "회원가입",
            operationId = "signup",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "회원가입 요청 정보",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = SignupRequest.class),
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "nickname": "홍길동"
                                            }
                                            """
                            )
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "회원가입 및 JWT 발급 성공",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "유효성 검증 실패",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "VALIDATION_FAILED",
                                              "status": 400,
                                              "detail": "닉네임은 필수 입력 항목입니다."
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<String> signup(SignupRequest request, HttpSession session);
}
