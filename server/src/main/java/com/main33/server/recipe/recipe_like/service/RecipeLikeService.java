package com.main33.server.recipe.recipe_like.service;

import com.main33.server.member.entity.Member;
import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe.repository.RecipeRepository;
import com.main33.server.recipe.recipe.service.RecipeService;
import com.main33.server.recipe.recipe_like.entity.RecipeLike;
import com.main33.server.recipe.recipe_like.repository.RecipeLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RecipeLikeService {
    private final RecipeService recipeService;
    private final RecipeRepository recipeRepository;
    private final RecipeLikeRepository recipeLikeRepository;

    public void addLike(Long recipeId, Member member) {

        Recipe recipe = recipeService.findRecipeById(recipeId);

        if(!recipeLikeRepository.existsByMemberAndRecipe(member, recipe)) {
            // 호출되면 recipe에 있는 count 증가
            recipe.setLikeCount(recipe.getLikeCount() + 1);
            // RecipelikeRepository에 memberId, recipeId값 저장
            recipeLikeRepository.save(new RecipeLike(member, recipe));
        } else { // 한번 더 누르면 recipe에 있는 count 감소(취소)
            recipe.setLikeCount(recipe.getLikeCount() -1);
            recipeLikeRepository.deleteByMemberAndRecipe(member, recipe);
        }
    }
}
