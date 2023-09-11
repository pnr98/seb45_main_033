package com.main33.server.member.repository;

import com.main33.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(long memberId);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByUsername(String username);
    void deleteByUsername(String username);
}
