package com.main33.server.response;

import lombok.Getter;

public enum ExceptionCode {
    // 회원가입/로그인/로그아웃 케이스
    USERNAME_CONFLICT(ErrorStatus.CONFLICT, "이미 사용 중인 닉네임입니다."),
    EMAIL_CONFLICT(ErrorStatus.CONFLICT, "이미 사용 중인 이메일입니다."),
    INVALID_SIGNUP_FORMAT(ErrorStatus.BAD_REQUEST, "email은 이메일 형식, userName은 2~10자, password는 7~20자의 영문, 숫자, 특수문자의 조합이어야 합니다."),
    NON_EXISTENT_EMAIL(ErrorStatus.NOT_FOUND, "등록되지 않은 이메일입니다."),
    INCORRECT_PASSWORD(ErrorStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다."),

    // 회원 정보 케이스
    INVALID_USERID_FORMAT(ErrorStatus.BAD_REQUEST, "잘못된 요청. userId가 누락되었습니다."),
    INVALID_USER_FORMAT(ErrorStatus.BAD_REQUEST, "userName은 2~10자, password는 7~20자의 영문, 숫자, 특수문자의 조합이어야 합니다."),
    MEMBER_NOT_FOUND(ErrorStatus.NOT_FOUND, "해당 memberId를 가진 유저는 존재하지 않습니다."),

    // 레시피 케이스
    INVALID_RECIPE_NAME_FORMAT(ErrorStatus.BAD_REQUEST, "잘못된 요청. recipeName이 누락되었습니다."),
    INVALID_RECIPE_DESCRIPTION_FORMAT(ErrorStatus.BAD_REQUEST, "잘못된 요청. recipeDescrption이 누락되었습니다."),
    REFRIGERATOR_NOT_FOUND(ErrorStatus.NOT_FOUND, "나만의 냉장고 데이터를 찾을 수 없습니다."),
    RECIPE_NOT_FOUND(ErrorStatus.NOT_FOUND, "레시피를 찾을 수 없습니다."),

    // 댓글 케이스
    INVALID_COMMENT_FORMAT(ErrorStatus.BAD_REQUEST, "댓글은 500자 이하여야 합니다."),
    COMMENT_NOT_FOUND(ErrorStatus.NOT_FOUND, "댓글을 찾을 수 없습니다."),
    // 검색 케이스

    // 좋아요 케이스

    // 공통 케이스
    INVALID_INPUT_FORMAT(ErrorStatus.BAD_REQUEST, "하나 이상의 입력 필드가 올바른 형식이 아닙니다."),


    // Unauthorized 케이스
    UNAUTHORIZED_ACCESS(ErrorStatus.UNAUTHORIZED, "로그인이 필요한 기능입니다."),
    INVALID_ACCESS(ErrorStatus.UNAUTHORIZED, "잘못된 접근입니다.");

    @Getter
    private ErrorStatus errorStatus;

    @Getter
    private String message;

    public enum ErrorStatus {
        BAD_REQUEST(400),
        UNAUTHORIZED(401),
        FORBIDDEN(403),
        NOT_FOUND(404),
        CONFLICT(409);

        @Getter
        private final int code;

        ErrorStatus(int code) {
            this.code = code;
        }
    }

    ExceptionCode(ErrorStatus errorStatus, String message) {
        this.errorStatus = errorStatus;
        this.message = message;
    }
}