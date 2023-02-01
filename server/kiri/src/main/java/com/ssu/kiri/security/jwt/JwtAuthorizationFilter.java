package com.ssu.kiri.security.jwt;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.MemberRepository;
import com.ssu.kiri.security.auth.PrincipalDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

// 시큐리티가 가지고 있는 filter 중 BasicAuthenticationFilter 라는 것이 있다.
// 모든 주소는 이 필터를 탄다. 그리고 jwt가 있는지 검증하고 그에 따라 인가를 준다.
// 만약 권한이나 인증이 필요한 주소가 아니면 이 필터를 안탄다.
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private MemberRepository memberRepository;
    // =============== jwt 만료일자 추가 ==================
    private JwtTokenProvider jwtTokenProvider;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider) {
        super(authenticationManager);
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;

    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

//        System.out.println("인증이나 권한이 필요한 주소 요청이 됨");

        String jwtHeader = request.getHeader(JwtProperties.HEADER_STRING);
        System.out.println("jwtHeader = " + jwtHeader);


        // header 가 있는지 확인인
       if(jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return; // header 값이 없는 경우 따로 처리를 해주어야 할듯...
        }

        // JWT 토큰을 검증해서 정상적인 사용자인지 확인
        String jwtToken = request.getHeader(JwtProperties.HEADER_STRING)
                .replace(JwtProperties.TOKEN_PREFIX,"");

        System.out.println("jwtToken = " + jwtToken);

        // 로그아웃 시 TokenExpiredException 에러 처리
//        String email;
//        try {

//            email = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build()
//                    .verify(jwtToken).getClaim("email").asString();

//        }catch (TokenExpiredException e) {
//            chain.doFilter(request, response);
//            return;
//        }

        // 현재시간과 JWT 만료시간 체크
        System.out.println("now = "+ LocalDateTime.now());
        System.out.println("JWT.getExpiresAt() = " + JWT.decode(jwtToken).getExpiresAt());

        String email = null;
        if(jwtTokenProvider.validationToken(jwtToken)) {
            email = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build()
                    .verify(jwtToken).getClaim("email").asString();
            System.out.println("email = " + email);
        }

        // email 이 제대로 들어왔으면, 서명이 정상적으로 동작한 것.
        if(email != null) {
            Optional<Member> optionalMember = memberRepository.findByEmail(email);
            PrincipalDetails principalDetails = new PrincipalDetails(optionalMember.get());

            // JWT 토큰 서명을 통해 서명이 정상이면 Authentication 객체를 만들어준다.
            // 여기서 로그인을 해줄 것이 아니고 임의의 Authentication 객체를 생성할 것이므로, credential 값에 null 을 넣어줌
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

            // SecurityContextHolder.getContext() 는 시큐리티를 저장할 수 있는 세션 공간이다.
            // 강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장.
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }

        chain.doFilter(request,response);
    }
}
