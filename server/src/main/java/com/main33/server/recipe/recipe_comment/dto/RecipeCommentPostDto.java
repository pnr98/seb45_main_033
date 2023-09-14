package com.main33.server.recipe.recipe_comment.dto;

import com.main33.server.member.entity.Member;
import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe_comment.entity.RecipeComment;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;

@Getter
public class RecipeCommentPostDto {
    @NotBlank
    private String commentBody;

    public RecipeComment toEntity(Recipe recipe, Member member, Timestamp timestamp) {
        RecipeComment comment = new RecipeComment();
        comment.setRecipe(recipe);
        comment.setMember(member);
        comment.setCommentBody(commentBody);
        comment.setCreatedAt(timestamp);
        comment.setModifiedAt(timestamp);

        return comment;
    }
}
