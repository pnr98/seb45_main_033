package com.main33.server.refrigerator.entity;

import com.main33.server.ingredient.entity.Ingredient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "refrigerator_ingredient")
@Getter
@Setter
@NoArgsConstructor
public class RefrigeratorIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refrigeratorIngredientId;

    @ManyToOne
    @JoinColumn(name="refrigerator_id", nullable = false)
    private Refrigerator refrigerator;

    @ManyToOne
    @JoinColumn(name="ingredient_id", nullable = false)
    private Ingredient ingredient;
}