package com.ssu.kiri.infra;

import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.MemberService;
import com.ssu.kiri.security.auth.PrincipalDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithSecurityContextFactory;


public class WithAccountSecurityContextFactory implements WithSecurityContextFactory<WithAccount> {

    @Autowired
    MemberService memberService;

    @Autowired
    PrincipalDetailsService principalDetailsService;

    @Override
    public SecurityContext createSecurityContext(WithAccount annotation) {

        String username = annotation.value();
        String email = username + "@aaa.com";
        String password = "abcdefgh1234";
        String local = "서울";
        String school = "숭실대학교";
        String department = "대학생";

        Member member = Member.builder()
                .email(email)
                .username(username)
                .password(password)
                .local(local)
                .school(school)
                .department(department)
                .build();

        memberService.postMember(member);

        UserDetails userDetails = principalDetailsService.loadUserByUsername(email);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);

        return context;
    }
}
