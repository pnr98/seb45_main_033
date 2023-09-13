package com.main33.server.recipe.recipe.service;

import com.main33.server.member.entity.Member;
import com.main33.server.member.repository.MemberRepository;
import com.main33.server.recipe.recipe.dto.RecipeDto;
import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe.repository.RecipeRepository;
import com.main33.server.response.BusinessLogicException;
import com.main33.server.response.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, MemberRepository memberRepository) {
        this.recipeRepository = recipeRepository;
        this.memberRepository = memberRepository;
    }

    public Recipe createRecipe(Recipe recipe, Principal principal) {
        if (principal == null) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        // Principal에서 사용자 이름을 가져와서, 이를 통해 사용자의 고유 ID를 찾습니다.
        String username = principal.getName();
        Member currentUser = memberRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 레시피와 사용자를 연결
        recipe.setMember(currentUser);

        // DB에 레시피 저장
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(Recipe recipe) {
        // 이 예에서는 간단하게 처리합니다. 실제로는 더 복잡한 로직이 필요할 수 있습니다.
        return recipeRepository.save(recipe);
    }

    public Recipe findRecipeById(Long recipeId) {
        return recipeRepository.findById(recipeId)
                .orElseThrow(() -> new NoSuchElementException("Recipe not found"));
    }

    public List<Recipe> findAllRecipes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return recipeRepository.findAll(pageable).getContent();
    }

    public void deleteRecipeById(Long recipeId) {
        recipeRepository.deleteById(recipeId);
    }
}