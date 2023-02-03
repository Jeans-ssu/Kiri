package com.ssu.kiri.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

// 회원 가입
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PostMemberReqDto {
    @NotBlank
    @Pattern(regexp = "[a-zA-Zㄱ-ㅎ가-힣]{2,10}")
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "[0-9a-zA-Z]{8,16}")
    private String password;


    @NotBlank
    @Pattern(regexp = "[0-9a-zA-Z]{8,16}")
    private String passwordVal;

    @NotBlank
    private String interest;




}
