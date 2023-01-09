package com.ssu.kiri.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class MemberReqDto {

    // 회원 가입
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostMemberReqDto {

        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Pattern(regexp = "[0-9a-zA-Z]{8,16}")
        private String password;


        @NotBlank
        @Pattern(regexp = "[0-9a-zA-Z]{8,16}")
        private String passwordVal;

    }

    // 로그인
//    @Data
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class LoginReqDto {

        private String email;
        private String password;

    }


}
