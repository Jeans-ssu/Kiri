package com.ssu.kiri.member;

import com.ssu.kiri.member.dto.MemberResDto;
import com.ssu.kiri.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // 회원 가입
    public Member postMember(Member member) {

        String rawPassword = member.getPassword(); // encoding 전 비밀번호
        String encPassword = passwordEncoder.encode(rawPassword);

        Member changedMember = member.postFirstMember(encPassword); // 비밀번호 권한 수정

        Member savedMember = memberRepository.save(changedMember); // 저장
        return savedMember;
    }

    // 로그인
    public void loginMember() {

    }



}
