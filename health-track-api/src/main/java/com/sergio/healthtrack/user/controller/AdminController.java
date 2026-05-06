package com.sergio.healthtrack.user.controller;

import com.sergio.healthtrack.user.dto.request.CreateUserRequest;
import com.sergio.healthtrack.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    //Endpoint para crear usuarios
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody CreateUserRequest createUserRequest) {
        return ResponseEntity.ok(userService.createUser(createUserRequest));
    }

    //Endpoint para ver los usuarios con tipo User
    @GetMapping("/getUsers")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    //Endpoint para seleccionar un usuario por medio de su uuid
    @GetMapping("/getUser/{uuid}")
    public ResponseEntity<?> getUser(@PathVariable UUID uuid) {
        return ResponseEntity.ok(userService.getUser(uuid));
    }


}
