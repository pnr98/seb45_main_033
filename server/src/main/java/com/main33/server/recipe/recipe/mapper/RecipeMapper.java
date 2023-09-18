package com.main33.server.recipe.recipe.mapper;

import com.main33.server.recipe.recipe.dto.RecipeDto;
import com.main33.server.recipe.recipe.entity.Recipe;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecipeMapper {
    Recipe postDtoToRecipe(RecipeDto.Post postDto);
    Recipe patchDtoToRecipe(RecipeDto.Patch patchDto);
    RecipeDto.RecipeDetail recipeToRecipeDetail(Recipe recipe);
    List<RecipeDto.RecipeSummary> recipesToRecipeSummarys(List<Recipe> recipes);
    List<RecipeDto.RecipePostResponse> recipesToResponses(List<Recipe> recipes);
    RecipeDto.RecipeDetailResponse recipeToRecipeDetailResponse(Recipe recipe);
}