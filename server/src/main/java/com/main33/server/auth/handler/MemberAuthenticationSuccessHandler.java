package com.main33.server.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main33.server.member.dto.LoginResponseDto;
import com.main33.server.member.entity.Member;
import com.main33.server.response.SuccessCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.info("# Authenticated successfully!");

        Member member = (Member) authentication.getPrincipal();
        // 생성된 Access Token 가져오기
        String accessToken = response.getHeader("Authorization").substring(7);

        System.out.println("memberId : " + member.getMemberId());
        System.out.println("email : " + member.getEmail());
        System.out.println("username : " + member.getUsername());
        System.out.println("authority : " + member.getRoles());

        // 응답 바디
        LoginResponseDto responseBody = new LoginResponseDto();
        responseBody.setMessage(SuccessCode.SUCCESS_LOGIN.getMessage());
        responseBody.setMemberId(member.getMemberId());
        responseBody.setUsername(member.getUsername());
        responseBody.setToken(accessToken);

        // 응답 JSON 형태로 반환
        ObjectMapper objectMapper = new ObjectMapper();
        String responseBodyJsonString = objectMapper.writeValueAsString(responseBody);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(responseBodyJsonString);
    }
}
