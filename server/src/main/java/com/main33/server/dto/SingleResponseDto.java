package com.main33.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 단일 아이템을 응답으로 묶어주는 제네릭 DTO 클래스입니다.
 * 하나의 아이템만을 반환하는 다양한 API 엔드포인트에서 사용됩니다.
 *
 * @param <T> 반환될 아이템의 타입입니다.
 */
@AllArgsConstructor
@Getter
public class SingleResponseDto<T> {
    private T data;
}