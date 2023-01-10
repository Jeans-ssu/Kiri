package com.ssu.kiri.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.dto.MemberReqDto;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;


// 스프링 시큐리티 필터에 UsernamePasswordAuthenticationFilter 가 존재
// 원래 이 필터는 /login 을 요청해서 username, password를 post로 전송하면 동작함.
// 근데 formLogin().disable() 을 해서 이 필터가 동작을 안함 -> 그래서 이 필터를 다시 시큐리티 설정파일에서 등록해준다.
// 단, 이 필터에는 AuthenticationManager 라는 파라미터를 넘겨야 한다.
// 이 필터가 로그인을 진행하는 필터인데 AuthenticationManager 를 통해 로그인을 진행함.
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager; // 이걸 통해 로그인 시도

    // 로그인 시도 함수, /login 요청시 로그인 시도를 위해 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter : 로그인 시도 중");

        // 하는 일 : id, pw를 DB에서 확인한 후 정상이면,
        // 1. username, pw를 받아서
        // 2. 정상인지 로그인 시도를 해본다.
        // 가장 간단한 방법 : AuthenticationManager 로 로그인 시도를 하면
        // PrincipalDetailsService 이 호출됨 . 그러면 loadUserByUsername 이 자동으로 호출된다.
        // 3. 로그인 결과, PrincipalDetails가 반환되면 세션에 담고,
        // PrincipalDetails 를 세션에 담지 않으면 권한관리가 안된다.
        // 4. JWT 토큰을 만들어서 응답해주면 됨.

        // 1

//            BufferedReader br = request.getReader();
//            String input = null;
//
//            while((input = br.readLine()) != null) {
//                System.out.println("input = " + input);
//            }

        ObjectMapper om = new ObjectMapper(); // json 데이터를 파싱해줌
        MemberReqDto.LoginReqDto loginReqDto = null;
        try {
            // MemberReqDto.LoginReqDto 에 @Data 또는 @ToString 걸어야 함 -> 아니면 null포인터 예외 발생!!
            loginReqDto = om.readValue(request.getInputStream(), MemberReqDto.LoginReqDto.class);

            // 2

            // token 생성
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword());
            // 로그인 시도 , 아래 코드 실행시, PrincipalDetailsService 의 loadUserByUsername() 함수가 실행되고 정상이면 authentication 이 리턴됨
            // authenticationManager 에 토큰을 넣어서 던지면, 인증이 되고, authentication 을 받게 된다.
            // authentication 내에 내 로그인한 정보가 담긴다.
            // 즉, 로그인이 정상적으로 되면, authentication 이 만들어진다.
            // DB에 있는 email 과 password 가 일치한다. => 인증 끝
            Authentication authentication = authenticationManager.authenticate(authenticationToken);


            // 값을 꺼내 확인 => 로그인이 정상적으로 되었다는 뜻뜻
           PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            System.out.println("로그인 완료됨 : " + principalDetails.getMember().getEmail());
            System.out.println("로그인 완료됨 : " + principalDetails.getMember().getPassword());


            // authentication 객체를 session 영역에 저장해야 하는데 그 방법이 return
            // 리턴의 이유는 권한 관리를 security 가 해주기 때문에 편하려고 하는 거임.
            // 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한 처리 때문에 session 에 넣어줌
            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(loginReqDto);


        return null;
    }


    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면, successfulAuthentication 함수가 실행됨.
    // JWT 토큰을 만들어서 request 요청한 사용자에게 JWT 토큰을 response해주면 됨
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행됨 : 인증 완료!!");

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id",principalDetails.getMember().getId())
                .withClaim("email",principalDetails.getMember().getEmail())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);

    }
}
