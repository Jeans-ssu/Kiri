package com.ssu.kiri.security.auth;

import com.ssu.kiri.member.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

// 시큐리티 진행 완료시 시큐리티 session 생성됨 (Security ContextHolder)
// 오브젝트 타입 => Authentication 타입 객체
// Authentication 안에 User 정보 필요
// User 오브젝트 타입 => UserDetails
// Security Session => Authentication => UserDetails => User 정보

public class PrincipalDetails implements UserDetails {

    private Member member; // composition

    public PrincipalDetails(Member member) {
        this.member = member;
    }

    // 해당 유저의 권한을 리턴하는 곳
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return member.getRole();
            }
        });
        return collect;
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getUsername();
    }

    // 계정이 만료되었는지 묻는 곳
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정 잠겼는지
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 계정의 비밀번호를 1년이상 사용했는지
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정이 활성화되어 있는지
    @Override
    public boolean isEnabled() {

        // 우리 사이트에서 1년동안 회원이 로그인을 안해서 휴먼계정으로 변경
        // 현재 시간 - 최근 로그인 시간 > 1년 이면 return false; 로 비활성화

       return true;
    }
}
