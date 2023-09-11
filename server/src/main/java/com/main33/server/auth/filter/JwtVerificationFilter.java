package com.main33.server.auth.filter;

import com.main33.server.auth.jwt.JwtTokenizer;
import com.main33.server.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
// JWT의 검증은 request 당 단 한 번만 수행하면 되기 때문에 OncePerRequestFilter 확장하여 사용
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        // 문제없이 JWT의 서명 검증에 성공하고, Security Context에 Authentication을 저장한 뒤 다음꺼 Security Filter 호출
        filterChain.doFilter(request, response);
    }

    // 특정 조건에 부합하면(true이면) 해당 Filter의 동작을 수행하지 않고 다음 Filter로 건너뛰는 필터
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // Authorization header의 값 가져옴
        String authorization = request.getHeader("Authorization");
        // Authorization header의 값이 null이거나 “Bearer”로 시작하지 않는다면 해당 Filter의 동작을 수행하지 않도록 정의
        return authorization == null || !authorization.startsWith("Bearer");
    }

    // JWT를 검증하는 데 사용되는 private 메서드
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        // header에서 JWT 가져옴
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        // JWT 서명(Signature)을 검증하기 위한 Secret Key 가져옴
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        // JWT에서 Claims를 파싱 -> 파싱할 수 있다면 내부적으로 서명(Signature) 검증에 성공했다는 의미
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    // Authentication 객체를 SecurityContext에 저장하기 위한 메서드
    private void setAuthenticationToContext(Map<String, Object> claims) {
        // JWT에서 파싱 한 Claims에서 username 가져옴
        String username = (String) claims.get("username");
        // JWT의 Claims에서 얻은 권한 정보를 기반으로 List<GrantedAuthority를 생성
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        /// username과 List<GrantedAuthority를 포함한 Authentication 객체를 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        // SecurityContext에 Authentication 객체를 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
