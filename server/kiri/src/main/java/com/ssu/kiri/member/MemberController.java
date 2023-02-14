package com.ssu.kiri.member;

import com.ssu.kiri.member.dto.request.PostMemberReqDto;
import com.ssu.kiri.member.dto.request.UpdateDto;
import com.ssu.kiri.member.dto.response.PostMemberResDto;
import com.ssu.kiri.member.dto.response.FindAndUpdateDto;
import com.ssu.kiri.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    @PostMapping("/auth/signup")
    public ResponseEntity postMember(@Valid @RequestBody PostMemberReqDto postDto) {

        Member member = Member.builder()
                .email(postDto.getEmail())
                .username(postDto.getUsername())
                .password(postDto.getPassword())
                .local(postDto.getLocal())
                .school(postDto.getSchool())
                .department(postDto.getDepartment())
                .build();

//        Member member = memberMapper.postToMember(postDto);
        Member savedMember = memberService.postMember(member);

        return ResponseEntity.ok(PostMemberResDto.of(savedMember));
    }

    // /member/{member-id}
    // myPage 조회 - 개인 정보 조회
    @GetMapping("/member")
    public ResponseEntity getMyMember( //@PathVariable("member-id") Long member_id
                                        ) {

        // SecurityContextHolder/Authentication/Principal 내의 세션에서 유저 찾아오기
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Long id = member.getId();
//        System.out.println("findMember = " + findMember);
//        System.out.println("findMember.email = " + findMember.getEmail());

        Member findMember = memberService.findMember(id);

//        return ResponseEntity.ok(memberMapper.toFindDto(findMember));
        return ResponseEntity.ok(FindAndUpdateDto.of(findMember));
    }

    // myPage 수정 - 개인 정보 수정
    @PostMapping("/member")
    public ResponseEntity updateMyMember(//@PathVariable("member-id") Long member_id,
                                         @Valid @RequestBody UpdateDto updateDto) {

        Member updateMember = memberService.updateMember(updateDto);

        return ResponseEntity.ok(FindAndUpdateDto.of(updateMember));
    }

    @PostMapping("/auth/{email}/exist")
    public ResponseEntity checkEmailDuplicate(@PathVariable String email) {
        boolean isCheck = memberService.checkEmailDuplicate(email);
        return ResponseEntity.ok(isCheck);
    }

    @PostMapping("/auth/{password}/exist")
    public ResponseEntity checkPasswordExist(@PathVariable String password) {
        boolean isCheck = memberService.checkPasswordExist(password);
        return ResponseEntity.ok(isCheck);
    }

}
