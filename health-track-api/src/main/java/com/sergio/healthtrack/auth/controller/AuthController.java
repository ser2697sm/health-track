package com.sergio.healthtrack.auth.controller;

import com.sergio.healthtrack.auth.dto.request.LoginRequest;
import com.sergio.healthtrack.auth.dto.response.LoginResponse;
import com.sergio.healthtrack.auth.service.AuthService;
import com.sergio.healthtrack.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

   private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authService.login(loginRequest);
        return ResponseEntity.ok(new LoginResponse(token));
    }
}
