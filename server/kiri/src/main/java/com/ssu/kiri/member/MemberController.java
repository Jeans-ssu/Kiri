package com.ssu.kiri.member;

import com.ssu.kiri.member.dto.MemberReqDto;
import com.ssu.kiri.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

    // user 권한만 접근가능
    @GetMapping("/member/2")
    public String user() {
        return "member/2";
    }

    // 인증이 필요한 접근
    @GetMapping("/calender/3")
    public String calender() {
        return "/calender/3";
    }


}
