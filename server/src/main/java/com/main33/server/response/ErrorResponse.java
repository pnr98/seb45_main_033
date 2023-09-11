package com.main33.server.response;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.Set;

@Getter
public class ErrorResponse {
    private static final Logger logger = LoggerFactory.getLogger(ErrorResponse.class);

    private int status;
    private String message;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static ErrorResponse of(BindingResult bindingResult) {
        logger.error("Binding error occurred: {}", bindingResult.getAllErrors());
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Binding Error");
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
        logger.error("Validation error occurred: {}", violations);
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Validation Error");
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        boolean valid = exceptionCode != ExceptionCode.USERNAME_CONFLICT &&
                exceptionCode != ExceptionCode.EMAIL_CONFLICT;
        logger.info("Exception code: {}", exceptionCode);
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        logger.info("HTTP status: {}", httpStatus);
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        logger.info("HTTP status: {}, Message: {}", httpStatus, message);
        return new ErrorResponse(httpStatus.value(), message);
    }
}