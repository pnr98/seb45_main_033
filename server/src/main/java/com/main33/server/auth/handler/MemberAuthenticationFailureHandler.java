package com.main33.server.auth.handler;

import com.google.gson.Gson;
import com.main33.server.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

        log.error("# Authentication failed: {}", exception.getMessage());

        sendErrorResponse(response);
    }

    private void sendErrorResponse(HttpServletResponse response) throws IOException {
        Gson gson = new Gson(); // // Error 정보가 담긴 객체(ErrorResponse)를 JSON 문자열로 변환하는 데 사용

        // ErrorResponse 객체를 생성 후 HttpStatus.UNAUTHORIZED 상태 코드를 전달
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 일치하지 않습니다.");
        // response의 Content Type이 “application/json”이라는 것을 클라이언트에게 알려줄 수 있도록 HTTP Header에 추가
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        // response의 status가 401 임을 클라이언트에게 알려줄 수 있도록 HTTP Header에 추가
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
