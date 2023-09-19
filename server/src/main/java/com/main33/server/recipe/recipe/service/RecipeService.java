package com.main33.server.recipe.recipe.service;

import com.main33.server.member.entity.Member;
import com.main33.server.member.repository.MemberRepository;
import com.main33.server.recipe.recipe.dto.RecipeDto;
import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe.repository.RecipeRepository;
import com.main33.server.response.BusinessLogicException;
import com.main33.server.response.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, MemberRepository memberRepository) {
        this.recipeRepository = recipeRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Recipe createRecipe(Recipe recipe, String username) {
        Member currentUser = memberRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (recipe.getRecipeName() == null || recipe.getRecipeName().trim().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_RECIPE_NAME_FORMAT);
        }
        if (recipe.getRecipeDescription() == null || recipe.getRecipeDescription().trim().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_RECIPE_DESCRIPTION_FORMAT);
        }

        recipe.setMember(currentUser);
        return recipeRepository.save(recipe);
    }


    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Recipe updateRecipe(Recipe newRecipeData, String currentPrincipalName) {
        if (newRecipeData.getRecipeName() == null || newRecipeData.getRecipeName().trim().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_RECIPE_NAME_FORMAT);
        }
        if (newRecipeData.getRecipeDescription() == null || newRecipeData.getRecipeDescription().trim().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_RECIPE_DESCRIPTION_FORMAT);
        }

        Recipe currentRecipe = recipeRepository.findById(newRecipeData.getRecipeId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.RECIPE_NOT_FOUND));

        Member currentUser = memberRepository.findByUsername(currentPrincipalName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (!currentUser.getUsername().equals(currentRecipe.getMember().getUsername())) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        // 레시피 수정 로직
        currentRecipe.setRecipeName(newRecipeData.getRecipeName());
        currentRecipe.setCookingTime(newRecipeData.getCookingTime());
        currentRecipe.setRecipeDescription(newRecipeData.getRecipeDescription());

        Optional.ofNullable(newRecipeData.getFoodType())
                .ifPresent(foodType -> currentRecipe.setFoodType(foodType));
        Optional.ofNullable(newRecipeData.getMainImageUrl())
                .ifPresent(mainImageUrl -> currentRecipe.setMainImageUrl(mainImageUrl));
        Optional.ofNullable(newRecipeData.getDifficulty())
                .ifPresent(difficulty -> currentRecipe.setDifficulty(difficulty));
        Optional.ofNullable(newRecipeData.getRecipeStep())
                .ifPresent(steps -> currentRecipe.setRecipeStep(steps));
        Optional.ofNullable(newRecipeData.getRecipeIngredients())
                .ifPresent(ingredients -> currentRecipe.setRecipeIngredients(ingredients));

        return recipeRepository.save(currentRecipe);
    }

    @Transactional(readOnly = true)
    public Recipe findRecipeById(Long recipeId) {
        return recipeRepository.findById(recipeId)
                .orElseThrow(() -> new NoSuchElementException("Recipe not found"));
    }

    @Transactional(readOnly = true)
    public List<Recipe> findAllRecipes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return recipeRepository.findAll(pageable).getContent();
    }

    @Transactional
    public void deleteRecipeById(Long recipeId) {
        recipeRepository.deleteById(recipeId);
    }

    @Transactional(readOnly = true)
    public Page<Recipe> findRecipesByFilters(List<String> foodTypes, String orderBy, int page, int size) {
        Pageable pageable;

        if ("asc".equalsIgnoreCase(orderBy)) {
            pageable = PageRequest.of(page, size, Sort.by("recipeName").ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by("recipeName").descending());
        }

        Specification<Recipe> spec = Specification.where(null);

        if (foodTypes != null && !foodTypes.isEmpty()) {
            // "foodType"는 Recipe 엔터티의 해당 필드입니다. 이 이름을 적절히 변경해 주세요.
            spec = spec.and((root, query, cb) -> root.get("foodType").in(foodTypes));
        }

        return recipeRepository.findAll(spec, pageable);
    }

    @Transactional
    public Page<Recipe> findRecipesBySearch(String searchWord, Pageable pageable) {
        Specification<Recipe> spec = Specification.where((root, query, cb) ->
                cb.like(root.get("recipeName"), "%" + searchWord + "%")
        );
        return recipeRepository.findAll(spec, pageable);
    }

//    public List<RecipeDto.RelatedRecipeDto> findRelatedRecipes(Long recipeId, int offset) {
//    }
}