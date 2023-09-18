package com.main33.server.recipe.recipe.controller;

import com.main33.server.dto.SingleResponseDto;
import com.main33.server.recipe.recipe.dto.RecipeDto;
import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe.mapper.RecipeMapper;
import com.main33.server.recipe.recipe.service.RecipeService;
import com.main33.server.response.SuccessCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recipes")
@Validated
@Slf4j
public class RecipeController {
    private static final String RECIPE_DEFAULT_URL = "/recipes";

    private final RecipeService recipeService;
    private final RecipeMapper recipeMapper;

    @Autowired
    public RecipeController(RecipeService recipeService, RecipeMapper recipeMapper) {
        this.recipeService = recipeService;
        this.recipeMapper = recipeMapper;
    }

    @PostMapping
    public ResponseEntity<?> postRecipe(
            @Valid @RequestBody RecipeDto.Post requestBody) {
        // 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        // 레시피 생성 로직
        Recipe recipeToCreate = recipeMapper.postDtoToRecipe(requestBody);
        Recipe createdRecipe = recipeService.createRecipe(recipeToCreate, currentPrincipalName);

        // 생성된 레시피의 URI
        URI location = URI.create(RECIPE_DEFAULT_URL + "/" + createdRecipe.getRecipeId());

        // 응답 메시지 생성
        RecipeDto.RecipePostResponse recipePostResponse =
                new RecipeDto.RecipePostResponse(SuccessCode.SUCCESS_CREATE_RECIPE.getMessage(), createdRecipe.getRecipeId());
        return ResponseEntity.created(location).body(recipePostResponse);
    }

    @PatchMapping("/{recipe-id}")
    public ResponseEntity<?> patchRecipe(
            @PathVariable("recipe-id") Long recipeId,
            @Valid @RequestBody RecipeDto.Patch requestBody) {
        // 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        // 레시피 수정 로직
        Recipe recipeToUpdate = recipeMapper.patchDtoToRecipe(requestBody);
        Recipe updatedRecipe = recipeService.updateRecipe(recipeToUpdate, currentPrincipalName);

        // 수정된 레시피의 URI
        URI location = URI.create(RECIPE_DEFAULT_URL + "/" + updatedRecipe.getRecipeId());

        // 응답 메시지 생성
        SingleResponseDto<String> recipePatchResponse =
                new SingleResponseDto<>(SuccessCode.SUCCESS_UPDATE_RECIPE.getMessage());
        return ResponseEntity.created(location).body(recipePatchResponse);
    }

    @GetMapping("/{recipe-id}")
    public ResponseEntity<?> getRecipe(@PathVariable("recipe-id") Long recipeId) {
        Recipe recipe = recipeService.findRecipeById(recipeId);
        RecipeDto.RecipeDetailResponse recipeDetailResponse = recipeMapper.recipeToRecipeDetailResponse(recipe);
        return new ResponseEntity<>(new SingleResponseDto<>(recipeDetailResponse), HttpStatus.OK);
    }

    @DeleteMapping("/{recipe-id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable("recipe-id") Long recipeId) {
        recipeService.deleteRecipeById(recipeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @GetMapping("/recipes/{recipe-id}/related")
//    public ResponseEntity<?> getRelatedRecipes(@PathVariable("recipe-id") Long recipeId,
//                                               @RequestParam(name = "offset", defaultValue = "0") int offset) {
//        List<RecipeDto.RelatedRecipeDto> relatedRecipes = recipeService.findRelatedRecipes(recipeId, offset);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("relatedRecipes", relatedRecipes);
//
//        return ResponseEntity.ok(response);
//    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        //TODO 유효성 검사 실패 시의 로직 작성
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
