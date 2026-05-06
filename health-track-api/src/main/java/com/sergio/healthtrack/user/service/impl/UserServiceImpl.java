package com.sergio.healthtrack.user.service.impl;

import com.sergio.healthtrack.common.RoleEnum;
import com.sergio.healthtrack.common.exception.ConflictException;
import com.sergio.healthtrack.user.dto.request.CreateAdminRequest;
import com.sergio.healthtrack.user.dto.request.CreateUserRequest;
import com.sergio.healthtrack.user.dto.response.AdminResponse;
import com.sergio.healthtrack.user.dto.response.UserResponse;
import com.sergio.healthtrack.user.entity.UserEntity;
import com.sergio.healthtrack.user.repository.UserRepository;
import com.sergio.healthtrack.user.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public AdminResponse createAdmin(CreateAdminRequest createAdminRequest) {

        if (userRepository.existsByRole(RoleEnum.ADMIN)) {
            throw new ConflictException("Initial admin already exists");
        }

        if (userRepository.existsByEmail(createAdminRequest.email())) {
            throw new ConflictException("Email already exists");
        }

        UserEntity userEntity = buildUser(createAdminRequest.firstName(), createAdminRequest.lastName(),
                createAdminRequest.secondName(), createAdminRequest.email(),
                passwordEncoder.encode(createAdminRequest.password()), RoleEnum.ADMIN,true);

        UserEntity savedUser =  userRepository.save(userEntity);

        return toAdminResponse(savedUser);
    }

    @Override
    public UserResponse createUser(CreateUserRequest createUserRequest) {

        if (userRepository.existsByEmail(createUserRequest.email())) {
            throw new ConflictException("Email already exists");
        }

        UserEntity userEntity = buildUser(createUserRequest.firstName(), createUserRequest.lastName(),
                createUserRequest.secondName(), createUserRequest.email(),
                null, RoleEnum.USER,false);

        UserEntity savedUser =  userRepository.save(userEntity);

        return toUserResponse(savedUser);
    }

    @Override
    public List<UserResponse> getUsers() {

        List<UserEntity> getUsers = userRepository.findByRole(RoleEnum.USER);

        return getUsers.stream()
                .map(this::toUserResponse)
                .toList();
    }

    @Override
    public UserResponse getUser(UUID uuid) {
        UserEntity getUser = userRepository.findByRoleAndId(RoleEnum.USER,uuid);
        return toUserResponse(getUser);
    }


    private UserEntity buildUser(String firstName, String lastName, String secondName, String email,
            String password, RoleEnum role, boolean enabled
    ) {
        return UserEntity.builder()
                .firstName(firstName)
                .lastName(lastName)
                .secondName(secondName)
                .email(email)
                .password(password)
                .role(role)
                .enabled(enabled)
                .build();
    }

    private AdminResponse toAdminResponse(UserEntity user) {
        return new AdminResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getSecondName(),
                user.getEmail()
        );
    }

    private UserResponse toUserResponse(UserEntity user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getSecondName(),
                user.getEmail()
        );
    }
}
