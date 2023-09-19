package com.main33.server.recipe.recipe.repository;

import com.main33.server.recipe.recipe.domain.FoodType;
import com.main33.server.recipe.recipe.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByFoodTypeIn(List<FoodType> foodTypes);
    Optional<Recipe> findByRecipeId(Long recipeId);

    // 최신 레시피 10개 가져오기
    List<Recipe> findTop10ByOrderByCreatedAtDesc();

    // 좋아요가 많은 10개 레시피 가져오기
    List<Recipe> findTop10ByOrderByLikeCountDesc();

    // 댓글이 많은 10개 레시피 가져오기
    List<Recipe> findTop10ByOrderByCommentsDesc();
    Page<Recipe> findAll(Specification<Recipe> spec, Pageable pageable);
    Page<Recipe> findByRecipeNameContaining(String searchWord, Pageable pageable);
}
