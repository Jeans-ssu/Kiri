package com.ssu.kiri.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 스프링 서버 전역적으로 CORS 설정
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*") // 허용할 HTTP METHOD
                .allowedOriginPatterns("http://kiriuniv.com") // 허용할 출처
                .allowCredentials(true) // 쿠키 인증 요청 허용
                .allowedHeaders("*")
                .exposedHeaders("Authorization"); // 반환하고싶은 헤더값
    }
}
