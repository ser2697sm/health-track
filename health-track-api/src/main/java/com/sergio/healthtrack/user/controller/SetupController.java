package com.sergio.healthtrack.user.controller;

import com.sergio.healthtrack.user.dto.request.CreateAdminRequest;
import com.sergio.healthtrack.user.dto.response.AdminResponse;
import com.sergio.healthtrack.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/setup")
public class SetupController {

    private final UserService userService;

    public SetupController(UserService userService) {
        this.userService = userService;
    }

    //Endpoint para crear usuario administrador
    @PostMapping("/admin")
    public AdminResponse createAdmin(@RequestBody @Valid CreateAdminRequest request) {
        return userService.createAdmin(request);
    }
}
