package com.main33.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 페이지네이션에 대한 정보를 담고 있는 DTO 클래스입니다.
 * 현재 페이지, 각 페이지의 크기, 전체 엘리먼트 수, 전체 페이지 수 등을 포함합니다.
 */
@AllArgsConstructor
@Getter
public class PageInfo {
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}