package com.pickeat.backend.login.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.nimbusds.jose.jwk.JWKSet;
import com.pickeat.backend.global.exception.ExternalApiException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class KakaoJwksClientTest {

    private final RestClient.Builder testBuilder = RestClient.builder();
    private final MockRestServiceServer mockServer = MockRestServiceServer.bindTo(testBuilder).build();
    private final KakaoJwksClient kakaoJwksClient = new KakaoJwksClient(testBuilder.build());

    @Nested
    class JWKSet_조회_케이스 {

        @Test
        void JWKS_엔드포인트_호출_성공시_JWKSet을_반환한다() {
            // given
            String mockResponse = """
                    {
                        "keys": [
                            {
                                "kid": "9f252dadd5f233f93d2fa528d12fea",
                                "kty": "RSA",
                                "alg": "RS256",
                                "use": "sig",
                                "n": "qGWf6RVzV2pM8YqJ6by5exoixIlTvdXDfYj2v7E6xkoYmesAjp_1IDhKLI3IjZGfQ0Mb_iY7gAtzPbbBlYNBl9DPgRdseiPzlOVK6vk2NbcA8jvIRcLnyvNDS1RKzMSk-x9JzpCWFsgGcK0Crd8aB1RbLkmTcsoQfaXmsiHsR8R4lA9fjQjwzkSJ4q1ATBUFCRdvTbCcm6CSUmlWN84zR8YOSm2GjMHmYzAEoTGdNNI03nWLpc8L9KFKuLs0jL_BpyTVTI8bGfMv1MWp_Ssme7BdF8j8AwSPgEnPNUZ7Xv6gAyHwGUYXBN9TmnCw7Ne7vHIyQ7y2OWB6ip2YpkpQ",
                                "e": "AQAB"
                            }
                        ]
                    }
                    """;

            mockServer.expect(requestTo("https://kauth.kakao.com/.well-known/jwks.json"))
                    .andExpect(method(HttpMethod.GET))
                    .andRespond(withSuccess(mockResponse, MediaType.APPLICATION_JSON));

            // when
            JWKSet jwkSet = kakaoJwksClient.fetchJwkSet();

            // then
            assertThat(jwkSet.getKeys()).hasSize(1);
            assertThat(jwkSet.getKeyByKeyId("9f252dadd5f233f93d2fa528d12fea")).isNotNull();
        }

        @Test
        void JWKS_엔드포인트_호출_실패시_ExternalApiException을_던진다() {
            // given
            mockServer.expect(requestTo("https://kauth.kakao.com/.well-known/jwks.json"))
                    .andExpect(method(HttpMethod.GET))
                    .andRespond(withServerError());

            // when & then
            assertThatThrownBy(kakaoJwksClient::fetchJwkSet)
                    .isInstanceOf(ExternalApiException.class);
        }

        @Test
        void 응답_파싱에_실패하면_ExternalApiException을_던진다() {
            // given
            mockServer.expect(requestTo("https://kauth.kakao.com/.well-known/jwks.json"))
                    .andExpect(method(HttpMethod.GET))
                    .andRespond(withSuccess("이것은 JWK가 아닙니다", MediaType.APPLICATION_JSON));

            // when & then
            assertThatThrownBy(kakaoJwksClient::fetchJwkSet)
                    .isInstanceOf(ExternalApiException.class);
        }
    }
}
