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
    private String username;
    private String local; // 지역
    private String school; // 학교
    private String department; // 소속 (일반인, 대학생, 중고등학생)

    public static PostMemberResDto of(Member member) {
        return new PostMemberResDto(member.getId(), member.getEmail(), member.getPassword(), member.getUsername(),
                member.getLocal(), member.getSchool(), member.getDepartment());
    }

}
