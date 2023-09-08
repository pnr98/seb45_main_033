package com.main33.server.recipe.recipe.entity;

import com.main33.server.ingredient.entity.Ingredient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "recipe_ingredient")
@Getter
@Setter
@NoArgsConstructor
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipeIngredientId;

    @ManyToOne
    @JoinColumn(name="ingredient_id", nullable = false)
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name="recipe_id", nullable = false)
    private Recipe recipe;
}