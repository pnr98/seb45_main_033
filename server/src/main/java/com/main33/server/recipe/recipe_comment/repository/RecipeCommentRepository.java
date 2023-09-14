package com.main33.server.recipe.recipe_comment.repository;

import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe_comment.entity.RecipeComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeCommentRepository extends JpaRepository<RecipeComment, Long> {
    List<RecipeComment> findAllBy(Long recipeId);
    Page<RecipeComment> findByRecipe(Recipe recipe, Pageable pageable);
}
