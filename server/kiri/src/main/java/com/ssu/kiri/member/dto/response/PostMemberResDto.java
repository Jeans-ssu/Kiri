package com.ssu.kiri.member.dto.response;


import com.ssu.kiri.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostMemberResDto {

    private Long id;
    private String email;
    private String password;

    public static PostMemberResDto of(Member member) {
        return new PostMemberResDto(member.getId(), member.getEmail(), member.getPassword());
    }

}
