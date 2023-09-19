package com.main33.server.recipe.recipe.service;

import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MainService {
    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> recommendPersonalizedRecipes(Set<String> preferredIngredients, Set<String> dislikedIngredients, Set<String> allergyIngredients) {
        // 모든 레시피를 가져옵니다.
        List<Recipe> allRecipes = recipeRepository.findAll();

        // 추천할 레시피를 담을 리스트 초기화
        List<Recipe> recommendedRecipes = new ArrayList<>();

        for (Recipe recipe : allRecipes) {
            // 레시피의 재료 텍스트를 파싱하여 Set으로 변환
            Set<String> recipeIngredients = parseIngredients(recipe.getIngredientsText());

            // 사용자가 싫어하는 재료가 레시피에 포함되어 있으면 제외
            if (!Collections.disjoint(dislikedIngredients, recipeIngredients)) {
                continue;
            }

            // 사용자가 알러지로 지정한 재료가 레시피에 포함되어 있으면 제외
            if (!Collections.disjoint(allergyIngredients, recipeIngredients)) {
                continue;
            }

            // 사용자가 선호하는 재료가 레시피에 포함되어 있을수록 높은 가중치 부여
            int score = calculateScore(recipeIngredients, preferredIngredients);
            recipe.setRecommendationScore(score);

            // 추천 리스트에 추가
            recommendedRecipes.add(recipe);
        }

        // 추천 점수에 따라 내림차순으로 정렬
        recommendedRecipes.sort(Comparator.comparingInt(Recipe::getRecommendationScore).reversed());

        return recommendedRecipes;
    }

    // 최신 레시피 10개 가져오기
    public List<Recipe> getNewestRecipes() {
        return recipeRepository.findTop10ByOrderByCreatedAtDesc();
    }

    // 좋아요가 많은 10개 레시피 가져오기
    public List<Recipe> getLikedRecipes() {
        return recipeRepository.findTop10ByOrderByLikeCountDesc();
    }

    // 댓글이 많은 10개 레시피 가져오기
    public List<Recipe> getCommentedRecipes() {
        return recipeRepository.findTop10ByOrderByCommentsDesc();
    }


    // 재료 텍스트를 줄 바꿈으로 분할하고 Set으로 변환하는 메서드
    // 예: "돼지고기 안심\n100g\n생강\n5g" -> ["돼지고기 안심", "100g", "생강", "5g"]
    private Set<String> parseIngredients(String ingredientsText) {
        Set<String> ingredientsSet = new HashSet<>();

        if (ingredientsText != null && !ingredientsText.isEmpty()) {
            // 재료 텍스트를 줄 바꿈으로 분할
            String[] ingredientsArray = ingredientsText.split("\n");

            // Set으로 변환
            ingredientsSet.addAll(Arrays.asList(ingredientsArray));
        }

        return ingredientsSet;
    }

    // 추천 점수를 계산하는 메서드 (가중치 부여)
    private int calculateScore(Set<String> recipeIngredients, Set<String> preferredIngredients) {
        int score = 0;

        // 사용자가 선호하는 재료가 레시피에 포함된 개수를 세고 가중치를 부여하여 점수 계산
        for (String preferredIngredient : preferredIngredients) {
            if (recipeIngredients.contains(preferredIngredient)) {
                // 재료가 레시피에 포함된 경우 가중치 추가
                score += 2; // 가중치 예시: 2점
            }
        }

        return score;
    }
}
