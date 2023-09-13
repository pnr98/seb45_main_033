package com.main33.server.recipe.recipe_like.controller;

import com.main33.server.member.entity.Member;
import com.main33.server.member.service.MemberService;
import com.main33.server.recipe.recipe_like.service.RecipeLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/like")
@RequiredArgsConstructor
public class RecipeLikeController {
    private final RecipeLikeService recipeLikeService;
    private final MemberService memberService;

    @PostMapping("/{recipe-Id}")
    public ResponseEntity addLike(@PathVariable("recipe-Id")@Positive Long boardId,
                                  @AuthenticationPrincipal String email ) {
        //이메일을 불러옴
        Member member = memberService.findByEmail(email);
        //id 랑 멤버 추가해 버림
        recipeLikeService.addLike(boardId,member);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
