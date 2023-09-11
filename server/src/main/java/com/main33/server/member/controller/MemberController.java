package com.main33.server.member.controller;

import com.main33.server.auth.userdetails.MemberDetailsService;
import com.main33.server.member.dto.*;
import com.main33.server.member.entity.Member;
import com.main33.server.response.BusinessLogicException;
import com.main33.server.response.ErrorResponse;
import com.main33.server.response.ExceptionCode;
import com.main33.server.member.service.MemberService;
import com.main33.server.response.SuccessCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/auth")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody MemberPostDto memberPostDto, BindingResult result) {
        // 입력 형식 오류 시
        if(result.hasErrors()){

            MemberResponseDto response = new MemberResponseDto();
            response.setMessage(ExceptionCode.INVALID_SIGNUP_FORMAT.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        // 정상적으로 입력 시
        try{
            memberService.createMember(memberPostDto);

            // 회원가입 성공 메시지 설정
            MemberResponseDto response = new MemberResponseDto();
            response.setMessage(SuccessCode.SUCCESS_SIGNUP.getMessage());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (BusinessLogicException e){
            // 이메일 충돌 등 비즈니스 로직 오류 메시지 반환

            if(e.getExceptionCode() == ExceptionCode.EMAIL_CONFLICT || e.getExceptionCode() == ExceptionCode.USERNAME_CONFLICT){
                MemberConflictResponseDto conflictResponse = new MemberConflictResponseDto();
                conflictResponse.setValid(false);
                conflictResponse.setMessage(e.getMessage());

                return ResponseEntity.status(HttpStatus.CONFLICT).body(conflictResponse);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 회원 정보 수정
    @PatchMapping("/profile/{memberId}")
    public ResponseEntity<?> updateProfile(
            @PathVariable("memberId") Long memberId,
            @Valid @RequestBody MemberPatchDto memberPatchDto,
            Principal principal
    ) {
        if (principal == null) {
            // 로그인하지 않은 경우 401 Unauthorized 응답을 반환
            MemberResponseDto response = new MemberResponseDto();
            response.setMessage(ExceptionCode.UNAUTHORIZED_ACCESS.getMessage());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            // 회원 정보 업데이트
            Member updatedMember = new Member();
            updatedMember.setMemberId(memberId);
            updatedMember.setEmail(memberPatchDto.getEmail());
            updatedMember.setUsername(memberPatchDto.getUsername());
            updatedMember.setPassword(memberPatchDto.getPassword());

            Member result = memberService.updateMember(updatedMember);

            if (result != null) {
                // 업데이트 성공 시
                MemberResponseDto response = new MemberResponseDto();
                response.setMessage(SuccessCode.SUCCESS_UPDATE_PROFILE.getMessage());

                return ResponseEntity.ok(response);
            } else {
                // 업데이트 실패 메시지 반환 (예: 해당 userId를 가진 유저가 없는 경우)
                MemberResponseDto response = new MemberResponseDto();
                response.setMessage(ExceptionCode.MEMBER_NOT_FOUND.getMessage());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (BusinessLogicException e) {
            if (e.getExceptionCode() == ExceptionCode.INVALID_USER_FORMAT) {
                MemberResponseDto response = new MemberResponseDto();
                response.setMessage(ExceptionCode.INVALID_USER_FORMAT.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
        }
    }

    // 회원 정보 조회
    @GetMapping("/profile/{memberId}")
    public ResponseEntity<?> getProfile(@PathVariable("memberId") Long memberId, Principal principal) {
        if (principal == null) {
            // 로그인하지 않은 경우 401 Unauthorized 응답을 반환
            MemberResponseDto response = new MemberResponseDto();
            response.setMessage(ExceptionCode.UNAUTHORIZED_ACCESS.getMessage());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        try {
            MemberProfileDto profile = memberService.getMember(memberId);
            if (profile == null) {
                MemberResponseDto response = new MemberResponseDto();
                response.setMessage(ExceptionCode.MEMBER_NOT_FOUND.getMessage());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else {
                return ResponseEntity.ok(profile);
            }
        } catch (BusinessLogicException e) {

            if (e.getExceptionCode() == ExceptionCode.INVALID_USERID_FORMAT) {
                MemberResponseDto response = new MemberResponseDto();
                response.setMessage(ExceptionCode.INVALID_USERID_FORMAT.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
        }
    }

    // 이메일 중복체크
    @GetMapping("/checkemail")
    public ResponseEntity<MemberConflictResponseDto> checkEmail(@RequestParam String email) {
        MemberConflictResponseDto response = new MemberConflictResponseDto();
        try {
            memberService.verifyExistsEmail(email);
            // 예외가 발생하지 않았다면, 이메일은 사용 가능
            response.setValid(true);
            response.setMessage("사용 가능한 이메일입니다.");
            return ResponseEntity.ok(response);
        } catch (BusinessLogicException e) {
            // EMAIL_CONFLICT 예외가 발생했다면, 이미 사용 중인 이메일
            if (e.getExceptionCode() == ExceptionCode.EMAIL_CONFLICT) {
                response.setValid(false);
                response.setMessage("이미 사용 중인 이메일입니다.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            throw e;
        }
    }

    // 닉네임 중복체크
    @GetMapping("/checkname")
    public ResponseEntity<MemberConflictResponseDto> checkName(@RequestParam String name) {
        MemberConflictResponseDto response = new MemberConflictResponseDto();
        try {
            memberService.verifyExistsUsername(name);
            // 예외가 발생하지 않았다면, 유저네임은 사용 가능합니다.
            response.setValid(true);
            response.setMessage("사용 가능한 닉네임입니다.");
            return ResponseEntity.ok(response);
        } catch (BusinessLogicException e) {
            // _CONFLICT 예외가 발생했다면, 이미 사용 중인 닉네임입니다.
            if (e.getExceptionCode() == ExceptionCode.USERNAME_CONFLICT) {
                response.setValid(false);
                response.setMessage("이미 사용 중인 닉네임입니다.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            throw e;
        }
    }

    // 회원 탈퇴
    @DeleteMapping("/deactivate")
    public ResponseEntity<?> deactivate(Principal principal) {
        if (principal == null) {
            MemberResponseDto response = new MemberResponseDto();
            response.setMessage("잘못된 접근입니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // 현재 로그인된 사용자의 username을 가져옴
        String username = principal.getName();

        try {
            memberService.deleteMember(username);  // 해당 username을 가진 회원을 삭제

            // 탈퇴 성공 메시지 설정
            MemberResponseDto response = new MemberResponseDto();
            response.setMessage(SuccessCode.SUCCESS_DEACTIVATE.getMessage());

            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
        } catch (Exception e) {
            // 회원 삭제 과정에서 오류가 발생하면, 서버 내부 오류 메시지를 반환
            MemberResponseDto response = new MemberResponseDto();
            response.setMessage("서버 내부 오류가 발생했습니다.");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
