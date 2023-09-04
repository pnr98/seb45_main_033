package com.main33.server.refrigerator.entity;

import com.main33.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "refrigerator")
@Getter
@Setter
@NoArgsConstructor
public class Refrigerator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refrigeratorId;

    @OneToOne
    @JoinColumn(name="member_id", nullable = false)
    private Member member;

    @Column
    private String preferredIngredient;

    @Column
    private String dislikedIngredient;

    @Column
    private String allergyIngredient;

    // Assuming many ingredients can be inside one refrigerator
    @OneToMany(mappedBy = "refrigerator")
    private List<RefrigeratorIngredient> refrigeratorIngredients;
}