package com.ssu.kiri.security.jwt;

public interface JwtProperties {
    String SECRET = "SECRET";
    int EXPIRATION_TIME = 259200000; // 3일 (1/1000초) , 최대 2,147,483,647
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
