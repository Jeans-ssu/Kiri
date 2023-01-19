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




}
