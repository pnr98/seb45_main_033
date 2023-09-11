package com.main33.server.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberConflictResponseDto {
    private boolean valid;
    private String message;
}
