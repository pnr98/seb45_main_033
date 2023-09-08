package com.main33.server.response;

import lombok.Getter;

public enum SuccessCode {
    // 회원가입/로그인/로그아웃 케이스
    SUCCESS_SIGNUP(SuccessStatus.CREATED, "정상적으로 회원가입되었습니다."),
    SUCCESS_CHECK_USERNAME(SuccessStatus.OK, "사용 가능한 닉네임입니다."),
    SUCCESS_CHECK_EMAIL(SuccessStatus.OK, "사용 가능한 이메일입니다."),
    SUCCESS_LOGIN(SuccessStatus.OK, "로그인에 성공하였습니다."),
    SUCCESS_LOGOUT(SuccessStatus.OK, "정상적으로 로그아웃처리되었습니다."),

    // 회원 정보 케이스
    SUCCESS_UPDATE_PROFILE(SuccessStatus.OK, "유저 데이터 업데이트에 성공했습니다."),
    SUCCESS_FIND_REFRIGERATOR(SuccessStatus.OK, null),
    SUCCESS_FIND_PROFILE(SuccessStatus.OK, null),

    // 레시피 케이스
    SUCCESS_CREATE_RECIPE(SuccessStatus.CREATED, "레시피가 성공적으로 등록되었습니다."),
    SUCCESS_UPDATE_RECIPE(SuccessStatus.OK, "레시피가 성공적으로 수정되었습니다."),
    SUCCESS_FIND_RECIPES(SuccessStatus.OK, null),
    SUCCESS_FIND_MORE_RECIPES(SuccessStatus.OK, null),
    NO_MORE_RECIPES(SuccessStatus.CREATED, "더 이상 불러올 레시피가 없습니다."),
    SUCCESS_FIND_RELATED_RECIPES(SuccessStatus.OK, null),

    // 댓글 케이스
    SUCCESS_CREATE_COMMENT(SuccessStatus.CREATED, "null"),

    // 검색 케이스
    SUCCESS_SEARCH(SuccessStatus.OK, null),

    // 좋아요 케이스
    SUCCESS_CREATE_LIKE(SuccessStatus.CREATED, "좋아요가 반영되었습니다."),

    // 공통 케이스
    SUCCESS_DELETE(SuccessStatus.NO_CONTENT, null);

    @Getter
    private SuccessStatus successStatus;

    @Getter
    private String message;

    public enum SuccessStatus {
        OK(200),
        CREATED(201),
        NO_CONTENT(204);

        @Getter
        private final int code;

        SuccessStatus(int code) {
            this.code = code;
        }
    }

    SuccessCode(SuccessStatus successStatus, String message) {
        this.successStatus = successStatus;
        this.message = message;
    }
}
