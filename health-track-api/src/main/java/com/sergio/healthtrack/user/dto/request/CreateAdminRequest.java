package com.sergio.healthtrack.user.dto.request;

import com.sergio.healthtrack.common.RoleEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;


import java.time.LocalDateTime;

@Builder
public record CreateAdminRequest(

        @NotBlank(message = "El nombre es obligatorio")
        String firstName,
        @NotBlank(message = "El primer apellido es obligatorio")
        String lastName,
        @NotBlank(message = "El segundo apellido es obligatorio")
        String secondName,
        @Email(message = "El email tiene un formato incorrecto")
        String email,
        @NotBlank(message = "la contraseña es obligatorio")
        String password
) {}
