package com.main33.server.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 페이징 처리된 아이템 목록을 단일 응답으로 묶어주는 제네릭 DTO 클래스입니다.
 * 여러 개의 아이템을 페이징 형태로 반환하는 다양한 API 엔드포인트에서 사용됩니다.
 *
 * @param <T> 페이징 리스트 내의 아이템의 타입입니다.
 */
@Getter
public class MultiResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;

    /**
     * 주어진 데이터와 페이지 정보로 새 인스턴스를 생성합니다.
     *
     * @param data 현재 페이지의 아이템 목록입니다.
     * @param page 페이지 정보를 담고 있는 Page 객체입니다.
     */
    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
