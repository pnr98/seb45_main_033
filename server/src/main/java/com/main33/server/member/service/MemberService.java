package com.main33.server.member.service;

import com.main33.server.auth.utils.CustomAuthorityUtils;
import com.main33.server.member.dto.MemberPostDto;
import com.main33.server.member.dto.MemberProfileDto;
import com.main33.server.member.entity.Member;
import com.main33.server.response.BusinessLogicException;
import com.main33.server.response.ExceptionCode;
import com.main33.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    // 회원 가입
    public Member createMember(MemberPostDto memberPostDto) {
        verifyExistsEmail(memberPostDto.getEmail());
        verifyExistsUsername(memberPostDto.getUsername());

        Member member = new Member();
        member.setEmail(memberPostDto.getEmail());
        member.setUsername(memberPostDto.getUsername());
        member.setPassword(passwordEncoder.encode(memberPostDto.getPassword()));
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        try{
            return memberRepository.save(member);
        } catch (DataIntegrityViolationException e){
            throw new BusinessLogicException(ExceptionCode.INVALID_INPUT_FORMAT);
        }
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getUsername())
                .ifPresent(username -> findMember.setUsername(username));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));

        return memberRepository.save(findMember);
    }

    // 회원 정보 조회
    public MemberProfileDto getMember(Long memberId) {
        // memberId를 사용하여 회원 정보를 조회하고 Member 엔티티를 얻어옴
        Member member = findVerifiedMember(memberId);

        // 회원 정보가 존재하지 않으면 예외처리
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        // Member 엔티티를 MemberProfileDto로 변환하여 반환
        return convertToProfileDto(member);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public void verifyExistsEmail(String email) {
        Optional<Member> existingEmail = memberRepository.findByEmail(email);
        if (existingEmail.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_CONFLICT);
        }
    }

    public void verifyExistsUsername(String username) {
        Optional<Member> existingUsername = memberRepository.findByUsername(username);
        if (existingUsername.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USERNAME_CONFLICT);
        }
    }

    // 회원 탈퇴
    public void deleteMember(String username) {
        Optional<Member> member = memberRepository.findByUsername(username);
        if (!member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        memberRepository.delete(member.get());
    }

    private List<GrantedAuthority> createAuthorities(String... roles) {
        // (3-1)
        return Arrays.stream(roles)
                .map(role -> new SimpleGrantedAuthority(role))
                .collect(Collectors.toList());
    }

    private MemberProfileDto convertToProfileDto(Member member) {
        MemberProfileDto profileDto = new MemberProfileDto();
        profileDto.setMemberId(member.getMemberId());
        profileDto.setEmail(member.getEmail());
        profileDto.setUsername(member.getUsername());
        return profileDto;
    }
}

