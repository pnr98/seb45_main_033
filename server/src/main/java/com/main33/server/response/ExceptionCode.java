package com.main33.server.response;

import lombok.Getter;

public enum ExceptionCode {
    // 회원가입/로그인/로그아웃 케이스
    USERNAME_CONFLICT(409, "이미 사용 중인 닉네임입니다."),
    EMAIL_CONFLICT(409, "이미 사용 중인 이메일입니다."),
    INVALID_SIGNUP_FORMAT(400, "email은 이메일 형식, userName은 2~10자, password는 7~20자의 영문, 숫자, 특수문자의 조합이어야 합니다."),
    NON_EXISTENT_EMAIL(404, "등록되지 않은 이메일입니다."),
    INCORRECT_PASSWORD(401, "비밀번호가 일치하지 않습니다."),

    // 회원 정보 케이스
    INVALID_USERID_FORMAT(400, "잘못된 요청. userId가 누락되었습니다."),
    INVALID_USER_FORMAT(400, "userName은 2~10자, password는 7~20자의 영문, 숫자, 특수문자의 조합이어야 합니다."),
    USER_NOT_FOUND(404, "해당 userId를 가진 유저는 존재하지 않습니다."),

    // 레시피 케이스
    INVALID_RECIPE_NAME_FORMAT(400, "잘못된 요청. recipeName이 누락되었습니다."),
    NO_MORE_RECIPES(204, "더 이상 불러올 레시피가 없습니다."),
    REFRIGERATOR_NOT_FOUND(404, "나만의 냉장고 데이터를 찾을 수 없습니다."),

    // 댓글 케이스
    INVALID_COMMENT_FORMAT(400, "댓글은 500자 이하여야 합니다."),

    // 검색 케이스

    // 좋아요 케이스

    // 공통 케이스
    INVALID_INPUT_FORMAT(400, "하나 이상의 입력 필드가 올바른 형식이 아닙니다."),


    // Unauthorized 케이스
    UNAUTHORIZED_ACCESS(401, "로그인이 필요한 기능입니다."),
    INVALID_ACCESS(401, "잘못된 접근입니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}