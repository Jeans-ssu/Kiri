package com.ssu.kiri.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email); // 단건 조회

    // email 중복 체크
    boolean existsByEmail(String email);

}
