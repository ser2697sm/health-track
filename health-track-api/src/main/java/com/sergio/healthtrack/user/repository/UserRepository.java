package com.sergio.healthtrack.user.repository;

import com.sergio.healthtrack.common.RoleEnum;
import com.sergio.healthtrack.user.entity.UserEntity;
import jakarta.persistence.Enumerated;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity,UUID> {

    boolean existsByEmail(String email);

    boolean existsByRole(RoleEnum rol);

    List<UserEntity> findByRole(RoleEnum rol);

    Optional<UserEntity> findByEmail(String email);

    UserEntity findByRoleAndId(RoleEnum rol,UUID uuid);


}
