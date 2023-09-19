package com.main33.server.refrigerator.entity;

import com.main33.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "refrigerator")
@Getter
@Setter
@NoArgsConstructor
public class Refrigerator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id", unique = true, nullable = false)
    private Member member;

    @ElementCollection
    @CollectionTable(name = "preferred_ingredients", joinColumns = @JoinColumn(name = "refrigerator_id"))
    @Column(name = "ingredient")
    private Set<String> preferredIngredients = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "disliked_ingredients", joinColumns = @JoinColumn(name = "refrigerator_id"))
    @Column(name = "ingredient")
    private Set<String> dislikedIngredients = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "allergy_ingredients", joinColumns = @JoinColumn(name = "refrigerator_id"))
    @Column(name = "ingredient")
    private Set<String> allergyIngredients = new HashSet<>();
}