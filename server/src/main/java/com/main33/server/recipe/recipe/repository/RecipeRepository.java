package com.main33.server.recipe.recipe.repository;

import com.main33.server.recipe.recipe.domain.FoodType;
import com.main33.server.recipe.recipe.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByFoodTypeIn(List<FoodType> foodTypes);
}
