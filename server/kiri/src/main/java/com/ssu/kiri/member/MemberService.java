package com.ssu.kiri.member;

import com.ssu.kiri.member.dto.request.UpdateDto;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
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
    public Member updateMember(UpdateDto updateDto) {

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Long id = member.getId();

        Member findMember = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("개인정보를 수정할 수 없습니다."));

        if(updateDto.isCheck_password()) { // 비밀번호 check api를 거쳐서 비밀번호 수정을 하는 경우 - true
            String rawPassword = updateDto.getPassword();
            String encPassword = passwordEncoder.encode(rawPassword);

            findMember.updateMyMember(updateDto.getEmail(), encPassword, updateDto.getUsername(),
                    updateDto.getLocal(), updateDto.getSchool(), updateDto.getDepartment());
        } else { // 비밀번호 수정을 하지 않는 경우
            findMember.updateMyMemberWithoutPassword(updateDto.getEmail(), updateDto.getUsername(), updateDto.getLocal(),
                    updateDto.getSchool(), updateDto.getDepartment());
        }

        Member resultMember = memberRepository.save(findMember);

        return resultMember;

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
