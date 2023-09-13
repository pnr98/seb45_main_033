package com.main33.server.recipe.recipe_like.entity;

import com.main33.server.member.entity.Member;
import com.main33.server.recipe.recipe.entity.Recipe;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "recipe_like")
@Getter
@Setter
@NoArgsConstructor
public class RecipeLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name="recipe_id")
    private Recipe recipe;

    @CreationTimestamp
    private Timestamp createdAt;

    public RecipeLike(Member member, Recipe recipe) {
        this.member = member;
        this.recipe = recipe;
    }
}