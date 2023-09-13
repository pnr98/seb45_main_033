package com.main33.server.recipe.recipe_like.repository;

import com.main33.server.member.entity.Member;
import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe_like.entity.RecipeLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeLikeRepository extends JpaRepository<RecipeLike, Long> {
    //있는지 없는지 검토
    boolean existsByMemberAndRecipe(Member member, Recipe recipe);
    //삭제
    void deleteByMemberAndRecipe(Member member, Recipe recipe);
}
