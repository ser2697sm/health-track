package com.sergio.healthtrack.auth.service;

import com.sergio.healthtrack.auth.dto.request.LoginRequest;

public interface AuthService {

    String login(LoginRequest loginRequest);


}
