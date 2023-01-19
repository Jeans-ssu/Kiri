package com.ssu.kiri.member;

import com.ssu.kiri.member.dto.MemberReqDto;
import com.ssu.kiri.member.mapper.MemberMapper;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;


    @PostMapping("/auth/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberReqDto.PostMemberReqDto postDto) {
        Member member = memberMapper.postToMember(postDto);
        Member savedMember = memberService.postMember(member);

        return ResponseEntity.ok(memberMapper.postResMember(savedMember));
    }


    // myPage 조회 - 개인 정보 조회
    @GetMapping("/member/{member-id}")
    public ResponseEntity getMyMember(@PathVariable("member-id") Long member_id) {

        // SecurityContextHolder/Authentication/Principal 내의 세션에서 유저 찾아오기
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Long id = member.getId();
//        System.out.println("findMember = " + findMember);
//        System.out.println("findMember.email = " + findMember.getEmail());

        Member findMember = memberService.findMember(id);

        return ResponseEntity.ok(memberMapper.toFindDto(findMember));
    }

    // myPage 수정 - 개인 정보 수정
    @PostMapping("/member/{member-id}")
    public ResponseEntity updateMyMember(@PathVariable("member-id") Long member_id,
                                         @Valid @RequestBody MemberReqDto.updateDto updateDto) {

        Member member = memberMapper.updateToM(updateDto);

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long id = principalDetails.getMember().getId();

        memberService.updateMember(member, id);

        return ResponseEntity.ok(memberMapper.toUpdateDto(member));
    }



}
