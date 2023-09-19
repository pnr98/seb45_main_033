package com.main33.server.refrigerator.controller;

import com.main33.server.refrigerator.dto.RefrigeratorRequestDto;
import com.main33.server.refrigerator.service.RefrigeratorService;
import com.main33.server.response.BusinessLogicException;
import com.main33.server.response.ExceptionCode;
import com.main33.server.response.SuccessCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mypage/refrigerator")
public class RefrigeratorController {
    private final RefrigeratorService refrigeratorService;

    public RefrigeratorController(RefrigeratorService refrigeratorService) {
        this.refrigeratorService = refrigeratorService;
    }
    @PostMapping("/{member-id}")
    public ResponseEntity<?> updateRefrigerator(
            @PathVariable("member-id") Long memberId,
            @RequestBody RefrigeratorRequestDto refrigeratorRequestDto
    ) {
        try {
            refrigeratorService.updateRefrigerator(memberId, refrigeratorRequestDto);
            return ResponseEntity.ok(SuccessCode.SUCCESS_UPDATE_REFRIGERATOR);
        } catch (BusinessLogicException e) {
            return ResponseEntity.badRequest().body(ExceptionCode.INVALID_INPUT_FORMAT);
        } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ExceptionCode.UNAUTHORIZED_ACCESS);
        }
    }
}
