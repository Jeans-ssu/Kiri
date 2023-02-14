package com.ssu.kiri.member;

import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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
        if(findMember.isPresent()) {
            return findMember.get();
        }else {
            throw new RuntimeException("개인정보를 찾을 수 없습니다.");
        }
//        return findMember.get();
    }


    // 개인 정보 수정하기
    public Member updateMember(Member member, Long id) {

        String rawPassword = member.getPassword();
        String encPassword = passwordEncoder.encode(rawPassword);

        Optional<Member> updateMember = memberRepository.findById(id);
        if(updateMember.isPresent()) {
            Member findMember = updateMember.get();
            findMember.updateMyMember(member.getEmail(), encPassword, member.getUsername(), member.getLocal(), member.getSchool(), member.getDepartment());
            Member resultMember = memberRepository.save(findMember);
            return resultMember;
        } else {
            throw new RuntimeException("개인정보를 수정할 수 없습니다.");
        }

//                .map(m -> {
//                    m.updateMyMember(member.getEmail(), encPassword, member.getUsername(), member.getInterest());
//                    return memberRepository.save(m);
//                });

//        return updateMember.get();
    }


    // email 중복 체크
    public boolean checkEmailDuplicate(String email) {
        return memberRepository.existsByEmail(email);
    }

    // 이미 존재하는 비밀번호인지 체크
    public boolean checkPasswordExist(String password) {
        // 기존 member 정보 찾아오기
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Long id = member.getId();

        Member findMember = memberRepository.findById(id).orElseThrow();


        if(passwordEncoder.matches(password, findMember.getPassword())) {
            return true;
        }

        return false;
    }
}
