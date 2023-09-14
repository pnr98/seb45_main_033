package com.main33.server.recipe.recipe_comment.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
@Getter
public class RecipeCommentUpdateDto {
    private long commentId;
    @NotBlank
    private String commentBody;
}
