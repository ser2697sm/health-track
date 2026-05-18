package com.sergio.healthtrack.config;

import com.sergio.healthtrack.common.RoleEnum;
import com.sergio.healthtrack.user.entity.UserEntity;
import com.sergio.healthtrack.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@Profile({"local", "dev"})
public class AdminInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    CommandLineRunner createInitialAdmin() {
        return args -> {

            if (userRepository.existsByEmail(adminEmail)) {
                return;
            }

            UserEntity admin = UserEntity.builder()
                    .firstName("Admin")
                    .lastName("Admin")
                    .secondName("Admin")
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(RoleEnum.ADMIN)
                    .enabled(true)
                    .build();

            userRepository.save(admin);

            System.out.println("Admin creado automáticamente");
        };
    }
}
