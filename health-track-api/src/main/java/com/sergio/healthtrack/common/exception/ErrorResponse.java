package com.sergio.healthtrack.common.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        String message,
        int status,
        LocalDateTime timestamp,
        Map<String, String> errors,
        String path
) {
}
