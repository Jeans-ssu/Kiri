package com.ssu.kiri.member.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDto {
    @NotBlank
    @Pattern(regexp = "[a-zA-Zㄱ-ㅎ가-힣]{2,10}")
    private String username;

    @NotBlank
    @Email
    private String email;

    @Pattern(regexp = "[0-9a-zA-Z]{8,16}")
    private String password;

    @NotBlank
    private String local; // 지역
    private String school; // 학교

    @NotBlank
    private String department; // 소속 (일반인, 대학생, 중고등학생)

    @NotNull
    private boolean check_password; // 비밀 번호 바꾸면 true, 안바꾸면 false


}
