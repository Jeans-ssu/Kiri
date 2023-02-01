package com.ssu.kiri.member.dto.response;


import com.ssu.kiri.member.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindAndUpdateDto {
    private Long id;
    private String email;
    private String password;
    private String interest;

    public static FindAndUpdateDto of(Member member) {
        return new FindAndUpdateDto(member.getId(), member.getEmail(), member.getPassword(), member.getInterest());
    }
}
