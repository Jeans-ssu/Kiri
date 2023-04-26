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
    private String local; // 지역
    private String school; // 학교
    private String department; // 소속 (일반인, 대학생, 중고등학생)

    public static LoginResDto of(Member member) {
        return new LoginResDto(member.getId(), member.getUsername(), member.getEmail(),
                member.getLocal(), member.getSchool(), member.getDepartment());
    }

}
