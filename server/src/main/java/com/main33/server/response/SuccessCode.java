package com.main33.server.response;

import lombok.Getter;

public enum SuccessCode {
    // 회원가입/로그인/로그아웃 케이스
    SUCCESS_SIGNUP(201, "정상적으로 회원가입되었습니다."),
    SUCCESS_CHECK_USERNAME(200, "사용 가능한 닉네임입니다"),
    SUCCESS_CHECK_EMAIL(200, "사용 가능한 이메일입니다"),
    SUCCESS_LOGIN(200, "로그인에 성공하였습니다."),
    SUCCESS_LOGOUT(200, "정상적으로 로그아웃처리되었습니다."),

    // 회원 정보 케이스
    SUCCESS_UPDATE_PROFILE(200, "유저 데이터 업데이트에 성공했습니다."),
    SUCCESS_FIND_REFRIGERATOR(200, null),
    SUCCESS_FIND_PROFILE(200, null),

    // 레시피 케이스
    SUCCESS_CREATE_RECIPE(201, "레시피가 성공적으로 등록되었습니다."),
    SUCCESS_UPDATE_RECIPE(200, "레시피가 성공적으로 수정되었습니다."),
    SUCCESS_FIND_RECIPES(200, null),
    SUCCESS_FIND_MORE_RECIPES(200, null),
    SUCCESS_FIND_RELATED_RECIPES(200, null),

    // 댓글 케이스
    SUCCESS_CREATE_COMMENT(201, "null"),

    // 검색 케이스
    SUCCESS_SEARCH(200, null),

    // 좋아요 케이스
    SUCCESS_CREATE_LIKE(201, "좋아요가 반영되었습니다."),

    // 공통 케이스
    SUCCESS_DELETE(204, null);

    @Getter
    private int status;

    @Getter
    private String message;

    SuccessCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
