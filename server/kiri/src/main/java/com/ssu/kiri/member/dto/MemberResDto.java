package com.ssu.kiri.member.dto;

import com.ssu.kiri.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberResDto {

    // 회원 가입 후
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostMemberResDto {

        private Long id;
        private String email;
        private String password;

        public static PostMemberResDto of(Member member) {
            return new PostMemberResDto(member.getId(), member.getEmail(), member.getPassword());
        }

    }



}
