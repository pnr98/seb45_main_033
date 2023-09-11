package com.main33.server.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main33.server.auth.jwt.JwtTokenizer;
import com.main33.server.member.dto.LoginDto;
import com.main33.server.member.entity.Member;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// Username/Password 기반의 인증을 처리하기 위해 UsernamePasswordAuthenticationFilter를 상속
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    // 인증을 시도하는 메서드
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // 클라이언트에서 전송한 Email과 Password를 DTO 클래스로 역직렬화
        ObjectMapper objectMapper = new ObjectMapper();
        // ServletInputStream을 LoginDto 클래스의 객체로 역직렬화
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        // Email과 Password 정보를 포함한 UsernamePasswordAuthenticationToken을 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        // UsernamePasswordAuthenticationToken을 AuthenticationManager에게 전달하면서 인증 처리를 위임
        return authenticationManager.authenticate(authenticationToken);
    }

    // 클라이언트의 인증 정보를 이용해 인증에 성공할 경우 호출되는 메서드
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        // Member 엔티티 클래스의 객체를 얻어옴
        // AuthenticationManager 내부에서 인증에 성공하면 인증된 Authentication 객체가 생성되면서 principal 필드에 Member 객체가 할당됨
        Member member = (Member) authResult.getPrincipal();
        // Access Token을 생성
        String accessToken = delegateAccessToken(member);
        // Refresh Token을 생성
        String refreshToken = delegateRefreshToken(member);
        // response header(Authorization)에 Access Token을 추가
        response.setHeader("Authorization", "Bearer " + accessToken);
        // response header(Refresh)에 Refresh Token을 추가
        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    // Access Token을 생성하는 메서드
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("email", member.getEmail());
        claims.put("username", member.getUsername());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // Refresh Token을 생성하는 메서드
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
