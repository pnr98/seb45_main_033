package com.main33.server.recipe.recipe.entity;


import com.main33.server.member.entity.Member;
import com.main33.server.recipe.recipe.domain.Difficulty;
import com.main33.server.recipe.recipe.domain.FoodType;
import com.main33.server.recipe.recipe_comment.entity.RecipeComment;
import com.main33.server.recipe.recipe_step.entity.RecipeStep;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "recipe")
@Getter
@Setter
@NoArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipeId;

    @ManyToOne
    @JoinColumn(name="member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private String recipeName;

    @Enumerated(EnumType.STRING)
    @Column(name = "food_type")
    private FoodType foodType;

    @Column(nullable = false)
    private Integer cookTime;

    @Column
    private String mainImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty")
    private Difficulty difficulty;

    @Column(nullable = false)
    private String recipeDescription;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "recipe")
    private List<RecipeStep> recipeStep = new ArrayList<>();

    @ElementCollection
    private List<String> ingredients;

    @Column(nullable = false, columnDefinition = "bigint default 0")
    private Long viewCount = 0L;

    @Column(nullable = false, columnDefinition = "bigint default 0")
    private Long likeCount = 0L;

    @Column(nullable = false, columnDefinition = "bigint default 0")
    private Long commentCount = 0L;

    @OneToMany(mappedBy = "recipe")
    private List<RecipeComment> comments = new ArrayList<>();

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp modifiedAt;
}