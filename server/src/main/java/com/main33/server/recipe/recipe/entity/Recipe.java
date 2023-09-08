package com.main33.server.recipe.recipe.entity;


import com.main33.server.member.entity.Member;
import com.main33.server.recipe.recipe.domain.RecipeFoodType;
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
    private RecipeFoodType recipeFoodType;

    @Column(nullable = false)
    private Integer cookingTime;

    @Column
    private String mainImageUrl;

    @Column(nullable = false)
    private String recipeDescription;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "recipe")
    private List<RecipeStep> recipeStep = new ArrayList<>();

    @ElementCollection
    private List<String> ingredients;

    @Column(nullable = false, columnDefinition = "bigint default 0")
    private Long viewCount;

    @Column(nullable = false, columnDefinition = "bigint default 0")
    private Long likeCount;

    @Column(nullable = false, columnDefinition = "bigint default 0")
    private Long commentCount;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp modifiedAt;
}