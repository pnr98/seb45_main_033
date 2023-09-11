package com.main33.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
@Getter
@AllArgsConstructor
public class MemberPatchDto {
    private long memberId;
    @NotBlank(message = "이메일 주소를 입력해주세요.")
    @Email(message = "올바른 이메일 주소를 입력해주세요.")
    private String email;

    @NotBlank(message = "유저네임을 입력해주세요.")
    @Size(min = 2, max = 10, message = "유저네임은 2자 이상 10자 이하로 입력해주세요.")
    private String username;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "패스워드는 최소 8글자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.")
    private String password;
}
