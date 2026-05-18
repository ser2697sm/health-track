package com.sergio.healthtrack.initialHealthRecordEntity.service.impl;

import com.sergio.healthtrack.initialHealthRecordEntity.dto.request.InitialHealthRecordRequest;
import com.sergio.healthtrack.initialHealthRecordEntity.dto.response.InitialHealthRecordResponse;
import com.sergio.healthtrack.initialHealthRecordEntity.entity.InitialHealthRecordEntity;
import com.sergio.healthtrack.initialHealthRecordEntity.repository.InitialHealthRecordRepository;
import com.sergio.healthtrack.initialHealthRecordEntity.service.InitialHealthRecordService;
import com.sergio.healthtrack.user.entity.UserEntity;
import com.sergio.healthtrack.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class InitialHealthRecordServiceImpl implements InitialHealthRecordService {

    private final InitialHealthRecordRepository healthRecordRepository;
    private final UserRepository userRepository;

    public InitialHealthRecordServiceImpl(InitialHealthRecordRepository healthRecordRepository, UserRepository userRepository) {
        this.healthRecordRepository = healthRecordRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void create(UUID uuid, InitialHealthRecordRequest recordRequest) {

        UserEntity userEntity = userRepository.findById(uuid).orElseThrow(
                () -> new RuntimeException("Usuario no encontrado"));

        InitialHealthRecordEntity healthRecordEntity = InitialHealthRecordEntity.builder()
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
    public List<InitialHealthRecordResponse> viewRecord(UUID userId) {

        List<InitialHealthRecordEntity> healthRecordEntity =  healthRecordRepository.findByUserId_Id(userId);

        return healthRecordEntity.stream().map(
                healRecord -> new InitialHealthRecordResponse(
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
