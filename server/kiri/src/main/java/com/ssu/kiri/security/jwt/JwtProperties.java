package com.ssu.kiri.security.jwt;

public interface JwtProperties {
    String SECRET = "SECRET";
    int EXPIRATION_TIME = 18000000; // 30분 (1/1000초)
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
