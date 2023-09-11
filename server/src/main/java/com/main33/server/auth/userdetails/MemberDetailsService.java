package com.main33.server.auth.userdetails;

import com.main33.server.auth.utils.CustomAuthorityUtils;
import com.main33.server.member.entity.Member;
import com.main33.server.member.repository.MemberRepository;
import com.main33.server.response.BusinessLogicException;
import com.main33.server.response.ExceptionCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

// 데이터베이스에서 사용자의 크리덴셜을 조회한 후, 조회한 크리덴셜을 AuthenticationManager에게 전달하는 클래스
@Component
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public MemberDetailsService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NON_EXISTENT_EMAIL));

        return new MemberDetails(findMember);
    }

    private final class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
                setMemberId(member.getMemberId());
                setEmail(member.getEmail());
                setUsername(member.getUsername());
                setPassword(member.getPassword());
                setRoles(member.getRoles());
        }

        @Override
        public String getEmail() {
            return super.getEmail();
        }

        @Override
        public String getUsername() {
            return super.getUsername();
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
