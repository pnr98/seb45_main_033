package com.main33.server.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private String message;
    private long memberId;
    private String username;
    private String token;
}
