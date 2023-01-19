package com.ssu.kiri.member;

import com.ssu.kiri.member.dto.MemberResDto;
import com.ssu.kiri.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional // commit 하면 지우기
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

    // 개인 정보 찾아오기
    public Member findMember(Long id) {
        Optional<Member> findMember = memberRepository.findById(id);
        return findMember.get();
    }


    // 개인 정보 수정하기
    public Member updateMember(Member member, Long id) {

        String rawPassword = member.getPassword();
        String encPassword = passwordEncoder.encode(rawPassword);

        Optional<Member> updateMember = memberRepository.findById(id)
                .map(m -> {
                    m.updateMyMember(member.getEmail(), encPassword, member.getUsername(), member.getInterest());
                    return memberRepository.save(m);
                });

        return updateMember.get();
    }


}