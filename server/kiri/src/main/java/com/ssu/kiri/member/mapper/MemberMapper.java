package com.ssu.kiri.member.mapper;

import com.ssu.kiri.member.Member;
import com.ssu.kiri.member.dto.MemberReqDto;
import com.ssu.kiri.member.dto.MemberResDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    // Member -> 회원가입 요청 시 객체
    Member postToMember(MemberReqDto.PostMemberReqDto postDto);

    // 회원가입 후 반환할 객체
    MemberResDto.PostMemberResDto postResMember(Member member);
}
