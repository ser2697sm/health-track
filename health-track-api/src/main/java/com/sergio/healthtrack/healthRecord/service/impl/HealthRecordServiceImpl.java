package com.sergio.healthtrack.healthRecord.service.impl;

import com.sergio.healthtrack.healthRecord.dto.request.HealthRecordRequest;
import com.sergio.healthtrack.healthRecord.dto.response.HealthRecordResponse;
import com.sergio.healthtrack.healthRecord.entity.HealthRecordEntity;
import com.sergio.healthtrack.healthRecord.repository.HealthRecordRepository;
import com.sergio.healthtrack.healthRecord.service.HealthRecordService;
import com.sergio.healthtrack.user.entity.UserEntity;
import com.sergio.healthtrack.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class HealthRecordServiceImpl implements HealthRecordService {

    private final HealthRecordRepository healthRecordRepository;
    private final UserRepository userRepository;

    public HealthRecordServiceImpl(HealthRecordRepository healthRecordRepository, UserRepository userRepository) {
        this.healthRecordRepository = healthRecordRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void create(UUID uuid, HealthRecordRequest recordRequest) {

        UserEntity userEntity = userRepository.findById(uuid).orElseThrow(
                () -> new RuntimeException("Usuario no encontrado"));

        HealthRecordEntity healthRecordEntity = HealthRecordEntity.builder()
                .userId(userEntity)
                .height(recordRequest.height())
                .peso(recordRequest.peso())
                .age(recordRequest.age())
                .gender(recordRequest.gender())
                .BodyFat(recordRequest.bodyFat())
                .MuscleMass(recordRequest.muscleMass())
                .levelActivity(recordRequest.levelActivity())
                .objective(recordRequest.objective())
                .createdAt(LocalDateTime.now())
                .build();

        healthRecordRepository.save(healthRecordEntity);
    }

    @Override
    public List<HealthRecordResponse> viewRecord() {

        List<HealthRecordEntity> healthRecordEntity =  healthRecordRepository.findAll();

        return healthRecordEntity.stream().map(
                healRecord -> new HealthRecordResponse(
                        healRecord.getHeight(),
                        healRecord.getPeso(),
                        healRecord.getAge(),
                        healRecord.getGender(),
                        healRecord.getBodyFat(),
                        healRecord.getMuscleMass(),
                        healRecord.getLevelActivity(),
                        healRecord.getObjective()
                )).toList();
    }
}
