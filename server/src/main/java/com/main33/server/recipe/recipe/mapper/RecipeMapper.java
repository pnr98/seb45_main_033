package com.main33.server.recipe.recipe.mapper;

import com.main33.server.recipe.recipe.dto.RecipeDto;
import com.main33.server.recipe.recipe.entity.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RecipeMapper {
    Recipe postDtoToRecipe(RecipeDto.Post postDto);
    Recipe patchDtoToRecipe(RecipeDto.Patch patchDto);
    List<RecipeDto.RecipePostResponse> recipesToResponses(List<Recipe> recipes);
    @Mapping(target = "likes", source = "recipe", qualifiedByName = "mapLikesToCount")
    RecipeDto.RecipeDetailResponse recipeToRecipeDetailResponse(Recipe recipe);
    @Named("mapLikesToCount")
    default Long mapLikesToCount(Recipe recipe) {
        return recipe.getLikes() != null ? (long) recipe.getLikes().size() : 0L;
    }
    RecipeDto.RecipeSummary recipeToRecipeSummary(Recipe recipe);
}