package com.sergio.healthtrack.healthRecord.repository;

import com.sergio.healthtrack.healthRecord.entity.HealthRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HealthRecordRepository extends JpaRepository<HealthRecordEntity, UUID> {



}
