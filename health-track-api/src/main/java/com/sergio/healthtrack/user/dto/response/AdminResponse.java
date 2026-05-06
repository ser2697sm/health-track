package com.sergio.healthtrack.user.dto.response;

import com.sergio.healthtrack.common.RoleEnum;
import lombok.Builder;

@Builder
public record AdminResponse(
        String firstName,
        String lastName,
        String secondName,
        String email
) {
}
