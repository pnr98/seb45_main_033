package com.main33.server.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberProfileDto {
    private Long memberId;
    private String username;
    private String email;
}
