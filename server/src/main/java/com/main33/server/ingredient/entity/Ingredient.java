package com.main33.server.ingredient.entity;

import com.main33.server.recipe.recipe.entity.RecipeIngredient;
import com.main33.server.refrigerator.entity.RefrigeratorIngredient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "ingredient")
@Getter
@Setter
@NoArgsConstructor
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ingredientId;

    @Column(nullable = false)
    private String ingredientName;

    @CreationTimestamp
    private Timestamp createdAt;

    @OneToMany(mappedBy = "ingredient")
    private List<RefrigeratorIngredient> refrigeratorIngredients;

    @OneToMany(mappedBy = "ingredient")
    private List<RecipeIngredient> recipeIngredients;
}