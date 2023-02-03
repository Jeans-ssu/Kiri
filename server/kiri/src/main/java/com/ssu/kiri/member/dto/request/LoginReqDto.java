package com.ssu.kiri.member.dto.request;


import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginReqDto {
    private String email;
    private String password;
}
