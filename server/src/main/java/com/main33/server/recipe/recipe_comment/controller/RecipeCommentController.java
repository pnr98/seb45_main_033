package com.main33.server.recipe.recipe_comment.controller;

import com.main33.server.auth.userdetails.MemberDetailsService;
import com.main33.server.member.entity.Member;
import com.main33.server.member.service.MemberService;
import com.main33.server.recipe.recipe_comment.dto.RecipeCommentPostDto;
import com.main33.server.recipe.recipe_comment.dto.RecipeCommentResponseDto;
import com.main33.server.recipe.recipe_comment.dto.RecipeCommentUpdateDto;
import com.main33.server.recipe.recipe_comment.entity.RecipeComment;
import com.main33.server.recipe.recipe_comment.service.RecipeCommentService;
import com.main33.server.response.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class RecipeCommentController {
    private final RecipeCommentService commentService;
    private final MemberService memberService;

    @PostMapping("/{recipe-id}")
    public ResponseEntity<?> createComment(
            @PathVariable("recipe-id") Long recipeId,
            @Valid @RequestBody RecipeCommentPostDto postDto,
            @AuthenticationPrincipal String email
    ) {
        Member member = memberService.findByEmail(email);

        RecipeComment savedComment = commentService.createComment(postDto, recipeId, member.getMemberId());

        RecipeCommentResponseDto responseDto = new RecipeCommentResponseDto(
                savedComment.getCommentId().toString(),
                savedComment.getCommentBody(),
                savedComment.getCreatedAt().toLocalDateTime(),
                savedComment.getMember().getMemberId(),
                savedComment.getMember().getUsername()
        );

        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<RecipeCommentResponseDto> updateComment(
            @PathVariable Long commentId,
            @Valid @RequestBody RecipeCommentUpdateDto updateDto
    ) {

        RecipeComment updatedComment = commentService.updateComment(commentId, updateDto);

        RecipeCommentResponseDto responseDto = new RecipeCommentResponseDto(
                updatedComment.getCommentId().toString(),
                updatedComment.getCommentBody(),
                updatedComment.getCreatedAt().toLocalDateTime(),
                updatedComment.getMember().getMemberId(),
                updatedComment.getMember().getUsername()
        );
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{recipe-id}")
    public ResponseEntity<List<RecipeCommentResponseDto>> getAllComment(
            @PathVariable("recipe-id") Long recipeId,
            Pageable pageable
    ) {
        Page<RecipeCommentResponseDto> comments = commentService.findAllComment(pageable, recipeId);
        return ResponseEntity.ok(comments.getContent());
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
