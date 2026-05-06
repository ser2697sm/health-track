package com.sergio.healthtrack.user.service;

import com.sergio.healthtrack.user.dto.request.CreateAdminRequest;
import com.sergio.healthtrack.user.dto.request.CreateUserRequest;
import com.sergio.healthtrack.user.dto.response.AdminResponse;
import com.sergio.healthtrack.user.dto.response.UserResponse;

import java.util.List;
import java.util.UUID;

public interface UserService {

    AdminResponse createAdmin(CreateAdminRequest createAdminRequest);

    UserResponse createUser(CreateUserRequest createAdminRequest);

    List<UserResponse> getUsers();

    UserResponse getUser(UUID uuid);

}
