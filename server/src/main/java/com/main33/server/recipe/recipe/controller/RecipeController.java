package com.main33.server.recipe.recipe.controller;

import com.main33.server.member.dto.MemberResponseDto;
import com.main33.server.recipe.recipe.dto.RecipeDto;
import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe.mapper.RecipeMapper;
import com.main33.server.recipe.recipe.service.RecipeService;
import com.main33.server.response.BusinessLogicException;
import com.main33.server.response.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.security.Principal;
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
    public ResponseEntity<?> createRecipe(@Valid @RequestBody RecipeDto.Post postDto,
                                          Principal principal) {
        RecipeDto.Response response = new RecipeDto.Response();
        if (principal == null) {
            // 로그인하지 않은 경우 401 Unauthorized 응답을 반환
            response.setMessage(ExceptionCode.UNAUTHORIZED_ACCESS.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            Recipe recipe = recipeMapper.postDtoToRecipe(postDto);
            Recipe createdRecipe = recipeService.createRecipe(recipe, principal);
            URI location = URI.create(RECIPE_DEFAULT_URL + "/" + createdRecipe.getRecipeId());
            response.setMessage("레시피가 성공적으로 등록되었습니다.");
            response.setRecipeId(createdRecipe.getRecipeId());
            return ResponseEntity.created(location).body(response);
        } catch (BusinessLogicException e) {
            if (e.getExceptionCode() == ExceptionCode.INVALID_RECIPE_NAME_FORMAT) {
                response.setMessage(ExceptionCode.INVALID_RECIPE_NAME_FORMAT.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
        }
    }

    @GetMapping("/{recipe-id}")
    public ResponseEntity<?> getRecipe(@PathVariable("recipe-id") Long recipeId) {
        Recipe recipe = recipeService.findRecipeById(recipeId);
        return new ResponseEntity<>(recipeMapper.recipeToRecipeDetail(recipe), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> listRecipes(@RequestParam(name = "page", defaultValue = "0") int page,
                                         @RequestParam(name = "size", defaultValue = "10") int size) {
        List<Recipe> recipes = recipeService.findAllRecipes(page, size);
        return new ResponseEntity<>(recipeMapper.recipesToRecipeSummarys(recipes), HttpStatus.OK);
    }

    @DeleteMapping("/{recipe-id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable("recipe-id") Long recipeId) {
        recipeService.deleteRecipeById(recipeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // 여기에 유효성 검사 실패 시의 로직을 작성합니다.
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
