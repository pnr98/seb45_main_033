package com.main33.server.refrigerator.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;
@Getter
@Setter
public class RefrigeratorRequestDto {
    private Set<String> preferredIngredients;
    private Set<String> dislikedIngredients;
    private Set<String> allergyIngredients;
}
