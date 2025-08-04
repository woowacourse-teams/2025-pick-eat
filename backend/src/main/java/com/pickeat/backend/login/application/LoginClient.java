package com.pickeat.backend.login.application;

public interface LoginClient {
    String getIdToken(String code);
}
