package com.ssu.kiri.member.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
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

    @NotBlank
    @Pattern(regexp = "[0-9a-zA-Z]{8,16}")
    private String password;

    @NotBlank
    private String interest;
}
