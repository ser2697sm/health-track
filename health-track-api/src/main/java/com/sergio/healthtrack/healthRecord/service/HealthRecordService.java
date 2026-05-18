package com.sergio.healthtrack.healthRecord.service;

import com.sergio.healthtrack.healthRecord.dto.request.HealthRecordRequest;
import com.sergio.healthtrack.healthRecord.dto.response.HealthRecordResponse;

import java.util.List;
import java.util.UUID;

public interface HealthRecordService {

    void create(UUID uuid,HealthRecordRequest recordRequest);
    List<HealthRecordResponse> viewRecord(UUID userId);
}
