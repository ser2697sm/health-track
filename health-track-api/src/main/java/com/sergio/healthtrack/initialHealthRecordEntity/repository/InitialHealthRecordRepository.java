package com.sergio.healthtrack.initialHealthRecordEntity.repository;

import com.sergio.healthtrack.initialHealthRecordEntity.entity.InitialHealthRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface InitialHealthRecordRepository extends JpaRepository<InitialHealthRecordEntity, UUID> {

    List<InitialHealthRecordEntity> findByUserId_Id(UUID uuid);

}
