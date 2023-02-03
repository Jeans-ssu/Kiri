package com.ssu.kiri.member.dto.response;

import com.ssu.kiri.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResDto {

    private Long id;
    private String username;
    private String email;
    private String interest;

    public static LoginResDto of(Member member) {
        return new LoginResDto(member.getId(), member.getUsername(), member.getEmail(), member.getInterest());
    }

}
