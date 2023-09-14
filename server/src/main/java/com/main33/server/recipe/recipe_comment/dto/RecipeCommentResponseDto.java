package com.main33.server.recipe.recipe_comment.dto;

import com.main33.server.recipe.recipe_comment.entity.RecipeComment;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RecipeCommentResponseDto {
    private String commentId;
    private String commentBody;
    private LocalDateTime timestamp;
    private Long memberId;
    private String userName;

    public RecipeCommentResponseDto(String commentId, String commentBody, LocalDateTime timestamp, Long memberId, String userName) {
        this.commentId = commentId;
        this.commentBody = commentBody;
        this.timestamp = timestamp;
        this.memberId = memberId;
        this.userName = userName;
    }
}
