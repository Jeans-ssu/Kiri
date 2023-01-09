package com.ssu.kiri.security.auth;


import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

// http://localhost:8080/login 시 동작 안함 => formLogin().disable() 때문.
//직접 PrincipalDetailsService 를 방문하는 필터를 만들어줘야 한다. -> JwtAuthenticationFilter

// Security Session => Authentication => UserDetails => User 정보
// 위 과정 중 Authentication 에 해당.
// 시큐리티 설정에서 /login 요청이 오면 자동으로 UserDetailsService 타입으로 IoC되어 있는 loadUserByUsername 함수가 실행됨.
@Service
@RequiredArgsConstructor // final 키워드가 있으면 값 주입 -> @Autowired 대신
public class PrincipalDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;


    // Security Session(Authentication(내부 UserDetails))
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println(" PrincipalDetailsService loadUserByUsername 실행!!");
        Optional<Member> byEmail = memberRepository.findByEmail(email);
        // byEmail != null
        if(byEmail.isPresent()) {
            return new PrincipalDetails(byEmail.get());
        }
        return null;
    }
}
