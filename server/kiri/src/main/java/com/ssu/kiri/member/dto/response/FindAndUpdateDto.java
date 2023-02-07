package com.ssu.kiri.member.dto.response;


import com.ssu.kiri.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindAndUpdateDto {
    private Long id;
    private String email;
    private String username;
    private String password;
    private String local; // 지역
    private String school; // 학교
    private String department; // 소속 (일반인, 대학생, 중고등학생)

    public static FindAndUpdateDto of(Member member) {
        return new FindAndUpdateDto(member.getId(), member.getEmail(), member.getUsername(), member.getPassword(),
                member.getLocal(), member.getSchool(), member.getDepartment());
    }
}
