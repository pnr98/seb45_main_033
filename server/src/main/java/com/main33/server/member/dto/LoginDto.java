package com.main33.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class LoginDto {
    private String email;
    private String password;
}
