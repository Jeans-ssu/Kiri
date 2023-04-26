package com.ssu.kiri.security.jwt;

import com.auth0.jwt.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    // 토큰의 유효성 + 만료일자 확인
    public boolean validationToken(String jwtToken) {
        try {
            Date JwtExpiresAt = JWT.decode(jwtToken).getExpiresAt();
            //System.out.println("JWT 토큰 만료시간이 지금 시각보다 전이니?" + JWT.decode(jwtToken).getExpiresAt().before(new Date()));
            return !JWT.decode(jwtToken).getExpiresAt().before(new Date());
        }catch (Exception e) {
            return false;
        }
    }

}
