package com.main33.server.recipe.recipe.dto;

import com.main33.server.recipe.recipe.domain.RecipeFoodType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

public class RecipeDto {
    // Class for POST & PATCH
    @Getter
    @Setter
    public static class Step {
        private Integer stepNumber;
        private String stepContent;
    }

    // For POST /recipes
    @Getter
    public static class Post {
        @NotNull
        private Long memberId;
        private RecipeFoodType recipeFoodTypes;
        @NotBlank
        private String difficulty;
        @NotBlank
        private String recipeName;
        private String mainImageUrl;
        private String recipeDescription;
        private Integer cookingTime;
        private List<Step> steps;
        private List<String> ingredients;
    }

    // For POST /recipes/from-wtable
    @Getter
    public static class PostFromWTable {
        @NotBlank
        private String url;
    }

    // For PATCH /recipes/{recipe-id}
    @Getter
    public static class Response {
        private Long recipeId;
        private RecipeFoodType recipeFoodTypes;
        private String difficulty;
        private String recipeName;
        private String mainImageUrl;
        private String recipeDescription;
        private Integer cookingTime;
        private List<Step> steps;
        private List<String> ingredients;
    }

    // For GET /recipes/{recipe-id}
    @Getter
    @AllArgsConstructor
    public static class RecipeDetail {
        private String foodTypes;
        private String difficulty;
        private String recipeName;
        private String mainImageUrl;
        private String recipeDescription;
        private String userName;
        private Integer cookingTime;
        private Long views;
        private Long likes;
        private Long commentCount;
        private Timestamp timestamp;
        private List<Step> steps;
        private List<String> ingredients;
    }

    // For DELETE /recipes/{recipe-id} (DTO에 추가할 필요가 없음)
}