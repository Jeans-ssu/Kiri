package com.ssu.kiri.member.dto;

import com.ssu.kiri.member.Member;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberResDto {

    // 회원 가입 후
    @Getter
    @AllArgsConstructor
    public static class PostMemberResDto {

        private Long id;
        private String email;
        private String password;

        public static PostMemberResDto of(Member member) {
            return new PostMemberResDto(member.getId(), member.getEmail(), member.getPassword());
        }

    }

    @Data
    @AllArgsConstructor
    public static class findDto {
        private Long id;
        private String email;
        private String password;
        private String interest;
    }


    @Data
    @AllArgsConstructor
    public static class updateDto {
        private Long id;
        private String email;
        private String password;
        private String interest;
    }





}
