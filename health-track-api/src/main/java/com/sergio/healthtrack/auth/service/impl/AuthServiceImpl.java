package com.sergio.healthtrack.auth.service.impl;

import com.sergio.healthtrack.auth.dto.request.LoginRequest;
import com.sergio.healthtrack.auth.service.AuthService;
import com.sergio.healthtrack.common.exception.BadRequestException;
import com.sergio.healthtrack.common.exception.ResourceNotFoundException;
import com.sergio.healthtrack.security.JwtUtil;
import com.sergio.healthtrack.user.entity.UserEntity;
import com.sergio.healthtrack.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public String login(LoginRequest loginRequest) {

        UserEntity user = userRepository.findByEmail(loginRequest.email()).orElseThrow(
                () -> new BadRequestException("Invalid credentials"));

        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        return jwtUtil.generarToken(user.getEmail(),String.valueOf(user.getRole()));
    }
}
