package com.sergio.healthtrack.user.dto.response;

import com.sergio.healthtrack.common.RoleEnum;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Builder
public record UserResponse(
        UUID uuid,
        String firstName,
        String lastName,
        String secondName,
        String email
) {
}
