package com.main33.server.recipe.recipe.dto;

import com.main33.server.recipe.recipe.domain.FoodType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.sql.Timestamp;
import java.util.List;

public class RecipeDto {
    // Class for POST & PATCH
    @Getter
    @Setter
    public static class Step {
        @NotNull
        private Integer stepNumber;

        @NotBlank
        private String stepContent;
    }

    // For POST /recipes
    @Getter
    public static class Post {
        @NotNull
        private FoodType foodType;

        private String difficulty;

        @Size(min = 3, max = 100)
        private String recipeName;

        private String mainImageUrl;
        private String recipeDescription;
        private Integer cookTime;

        @NotEmpty
        @Valid
        private List<Step> steps; // content에 가까움. 여러 step으로 나눔.

        @NotEmpty
        private List<String> ingredients;
    }

    // For PATCH /recipes/{recipe-id}
    @Getter
    public static class Patch {
        @NotNull
        private FoodType foodType;

        private String difficulty;

        @NotBlank
        private String recipeName;

        private String mainImageUrl;
        private String recipeDescription;
        private Integer cookTime;

        @NotEmpty
        @Valid
        private List<Step> steps;

        @NotEmpty
        private List<String> ingredients;
    }

    // For GET /recipes/{recipe-id}
    @Getter
    @AllArgsConstructor
    public static class RecipeDetail {
        @NotNull
        private FoodType foodType;

        private String difficulty;

        @NotBlank
        private String recipeName;

        private String mainImageUrl;
        private String recipeDescription;

        @NotBlank
        private String userName;

        private Integer cookTime;
        private Long views;
        private Long likes;
        private Long commentCount;

        @NotNull
        private Timestamp timestamp;

        @NotEmpty
        @Valid
        private List<Step> steps;

        @NotEmpty
        private List<String> ingredients;
    }

    // For
    // GET /recipes/{recipe-id}/related &
    // GET /recipes/list
    @Getter
    @AllArgsConstructor
    public static class RecipeSummary {
        @NotNull
        private Long recipeId;

        @NotBlank
        private String recipeName;
        private String mainImageUrl;

        @NotNull
        private FoodType foodType;

        private String difficulty;
        private Integer cookTime;
    }

    // For DELETE /recipes/{recipe-id} (DTO에 추가할 필요가 없음)

    // For /
    @Getter
    public static class RecipePostResponse {
        private String message;
        private Long recipeId;



        public RecipePostResponse(String message, Long recipeId) {
            this.message = message;
            this.recipeId = recipeId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class RecipeDetailResponse {
        @NotNull
        private FoodType foodType;

        private String difficulty;

        @NotBlank
        private String recipeName;

        private String mainImageUrl;

        private String recipeDescription;

        @NotBlank
        private String userName;

        private Integer cookingTime;

        private Long views;

        private Long likes;

        private Long commentCount;

        @NotNull
        private Timestamp timestamp;

        @NotEmpty
        @Valid
        private List<Step> steps;

        @NotEmpty
        private List<String> ingredients;
    }

    @Getter
    @AllArgsConstructor
    public class RelatedRecipeDto {
        private Long recipeId;
        private String recipeName;
        private String mainImageUrl;
        private String foodType;
        private String difficulty;
        private Integer cookTime;
    }
}