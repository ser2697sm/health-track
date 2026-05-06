package com.sergio.healthtrack.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "El email es obligatorio")
        @Email(message = "El email tiene que tener un formato correcto")
        String email,
        @NotBlank(message = "La contraseña es obligatoria")
        String password
) {
}
