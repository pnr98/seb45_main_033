package com.main33.server.refrigerator.repository;

import com.main33.server.member.entity.Member;
import com.main33.server.refrigerator.entity.Refrigerator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RefrigeratorRepository extends JpaRepository<Refrigerator, Long> {
    Optional<Refrigerator> findByIdAndMember(Long id, Member member);
}
