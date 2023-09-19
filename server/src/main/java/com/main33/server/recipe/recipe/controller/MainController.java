package com.main33.server.recipe.recipe.controller;

import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe.service.MainService;
import com.main33.server.recipe.recipe.service.RecipeService;
import com.main33.server.refrigerator.repository.RefrigeratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/main")
public class MainController {
    @Autowired
    private MainService mainService;

    @GetMapping("/load")
    public ResponseEntity<?> loadRecipes(@RequestHeader(value = "Authorization", required = false) String authToken) {
        // 여기에서 로그인 여부를 확인하고 authToken을 이용하여 사용자에게 맞는 데이터를 가져옴
        // authToken이 없으면 비로그인 상태로 처리할 수 있음
        // TODO

        // recipeService를 이용하여 데이터를 가져옴
        List<Recipe> newestRecipes = mainService.getNewestRecipes();
        List<Recipe> likedRecipes = mainService.getLikedRecipes();
        List<Recipe> commentedRecipes = mainService.getCommentedRecipes();

        Map<String, List<Recipe>> response = new HashMap<>();
        response.put("newest", newestRecipes);
        response.put("likes", likedRecipes);
        response.put("comments", commentedRecipes);

        return ResponseEntity.ok(response);
    }
}
