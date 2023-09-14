package com.main33.server.recipe.recipe_comment.service;

import com.main33.server.member.entity.Member;
import com.main33.server.member.repository.MemberRepository;
import com.main33.server.recipe.recipe.entity.Recipe;
import com.main33.server.recipe.recipe_comment.dto.RecipeCommentPostDto;
import com.main33.server.recipe.recipe_comment.dto.RecipeCommentResponseDto;
import com.main33.server.recipe.recipe_comment.dto.RecipeCommentUpdateDto;
import com.main33.server.recipe.recipe_comment.entity.RecipeComment;
import com.main33.server.recipe.recipe_comment.repository.RecipeCommentRepository;
import com.main33.server.response.BusinessLogicException;
import com.main33.server.response.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RecipeCommentService {
    private final RecipeCommentRepository recipeCommentRepository;
    private final RecipeRepository recipeRepository;
    private final RecipeService recipeService;
    private final MemberRepository memberRepository;

    public RecipeComment createComment(RecipeCommentPostDto postDto,
                                                  Long recipeId,
                                                  Long memberId) {
        Recipe recipe = recipeRepository.findByRecipeId(recipeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.UNAUTHORIZED_ACCESS));
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.UNAUTHORIZED_ACCESS));

        Timestamp timestamp = Timestamp.from(Instant.now());
        RecipeComment comment = postDto.toEntity(recipe, member, timestamp);

        RecipeComment savedComment = recipeCommentRepository.save(comment);

        return savedComment;
    }

    public RecipeComment updateComment(Long commentId, RecipeCommentUpdateDto updateDto) {
        RecipeComment existingComment = recipeCommentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        existingComment.setCommentBody(updateDto.getCommentBody());

        RecipeComment updatedComment = recipeCommentRepository.save(existingComment);

        return updatedComment;
    }

    public Page<RecipeCommentResponseDto> findAllComment(Pageable pageable, Long recipeId) {
        Recipe recipe = recipeService.findRecipeId(recipeId);
        Page<RecipeComment> comments = recipeCommentRepository.findByRecipe(recipe, pageable);
        return comments.map(this::FindFromReply);
    }

    public RecipeCommentResponseDto FindFromReply(RecipeComment comment) {
        RecipeCommentResponseDto responseDto = new RecipeCommentResponseDto(
                comment.getCommentId().toString(),
                comment.getCommentBody(),
                comment.getCreatedAt().toLocalDateTime(),
                comment.getMember().getMemberId(),
                comment.getMember().getUsername()
        );
        return responseDto;
    }

    public void deleteComment(Long commentId) {
        // 댓글을 찾아서 삭제
        RecipeComment commentToDelete = recipeCommentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        recipeCommentRepository.delete(commentToDelete);
    }
}
