package com.pickeat.backend.login.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.ExternalApiException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class KakaoLoginClientTest {

    private static final String CLIENT_ID = "test-client-id";

    private final RestClient.Builder testBuilder = RestClient.builder().baseUrl("https://kauth.kakao.com");
    private final MockRestServiceServer mockServer = MockRestServiceServer.bindTo(testBuilder).build();
    private final KakaoLoginClient kakaoLoginClient = new KakaoLoginClient(
            CLIENT_ID, testBuilder.build(), new ObjectMapper());

    @Nested
    class ID_토큰_조회_케이스 {

        @Test
        void 인가코드로_토큰_조회_성공시_idToken을_반환한다() {
            // given
            String mockResponse = """
                    {
                        "token_type": "bearer",
                        "access_token": "access-token-value",
                        "id_token": "id-token-value",
                        "expires_in": 21599,
                        "refresh_token": "refresh-token-value",
                        "refresh_token_expires_in": 5183999,
                        "scope": "account_email"
                    }
                    """;

            mockServer.expect(requestTo(org.hamcrest.Matchers.startsWith("https://kauth.kakao.com/oauth/token")))
                    .andExpect(method(HttpMethod.POST))
                    .andRespond(withSuccess(mockResponse, MediaType.APPLICATION_JSON));

            // when
            String idToken = kakaoLoginClient.getIdToken("auth-code", "https://pickeat.com/redirect");

            // then
            assertThat(idToken).isEqualTo("id-token-value");
        }

        @Test
        void 카카오_서버가_에러_응답을_반환하면_ExternalApiException을_던진다() {
            // given
            String errorResponse = """
                    {
                        "error": "invalid_grant",
                        "error_description": "authorization code not found for code=auth-code"
                    }
                    """;

            mockServer.expect(requestTo(org.hamcrest.Matchers.startsWith("https://kauth.kakao.com/oauth/token")))
                    .andExpect(method(HttpMethod.POST))
                    .andRespond(
                            withStatus(HttpStatus.BAD_REQUEST)
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .body(errorResponse)
                    );

            // when & then
            assertThatThrownBy(() -> kakaoLoginClient.getIdToken("auth-code", "https://pickeat.com/redirect"))
                    .isInstanceOf(ExternalApiException.class);
        }
    }
}
