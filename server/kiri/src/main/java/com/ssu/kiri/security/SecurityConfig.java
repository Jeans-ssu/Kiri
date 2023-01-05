package com.ssu.kiri.security;

import com.ssu.kiri.config.WebMvcConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.servlet.http.HttpServlet;

@Configuration // 해당 클래스를 IoC 컨테이너에 등록
@EnableWebSecurity // 시큐리티 활성화 -> 기본 스프링 필터체인에 등록
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()

                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
//                .apply(new MyCustomDsl()) // 커스텀 필터 등록
//                .and()

                .authorizeRequests(authorize -> authorize

                        .antMatchers("/api/posts/**","/calender/**","/logout/**").hasRole("USER")

                        .anyRequest() // 나머지 req들은 인증없이 허용
                        .permitAll()
                );

        return http.build();

    }

    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            // AuthenticationManager : Spring Security의 필터들이 인증을 수행하는 방법에 대한 명세를 정의해 놓은 인터페이스
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            // 필터 만들기
//            builder.addFilter(new JwtAuthenticationFilter(authenticationManager))
//                    .addFilter(new authenticationManager, userRepository)

        }
    }
}
