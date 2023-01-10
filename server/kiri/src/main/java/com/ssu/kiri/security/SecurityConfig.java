package com.ssu.kiri.security;

import com.ssu.kiri.config.WebMvcConfig;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.security.handler.MemberLogoutHandler;
import com.ssu.kiri.security.jwt.JwtAuthenticationFilter;
import com.ssu.kiri.security.jwt.JwtAuthorizationFilter;
import com.ssu.kiri.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Configuration // 해당 클래스를 IoC 컨테이너에 등록
@EnableWebSecurity // 시큐리티 활성화 -> 기본 스프링 필터체인에 등록
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) // @Secured 활성화, @PreAuthorize, @PostAuthorize 활성화
@RequiredArgsConstructor
public class SecurityConfig {

    private final MemberRepository memberRepository;
    // =============== jwt 만료일자 추가 ==================
    private final JwtTokenProvider jwtTokenProvider;

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
                .apply(new MyCustomDsl()) // 커스텀 필터 등록
//                .and()
//                .logout()
////                .logoutSuccessUrl("/login")
//                .addLogoutHandler(new MemberLogoutHandler())


                .and()

                .authorizeRequests(authorize -> authorize

//                        .antMatchers("/logout","/extra/**","/member/**")
//                        .access("hasRole('USER')")

                        .antMatchers("/api/posts/**","/calender/**","/extra/**","/member/**")
                        .authenticated()

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
            builder.addFilter(new JwtAuthenticationFilter(authenticationManager))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, memberRepository, jwtTokenProvider));
            // =============== jwt 만료일자 추가 ==================

        }
    }
}
