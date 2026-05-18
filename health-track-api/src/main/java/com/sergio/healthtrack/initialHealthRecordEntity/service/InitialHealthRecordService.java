package com.sergio.healthtrack.initialHealthRecordEntity.service;

import com.sergio.healthtrack.initialHealthRecordEntity.dto.request.InitialHealthRecordRequest;
import com.sergio.healthtrack.initialHealthRecordEntity.dto.response.InitialHealthRecordResponse;

import java.util.List;
import java.util.UUID;

public interface InitialHealthRecordService {

    void create(UUID uuid, InitialHealthRecordRequest recordRequest);
    List<InitialHealthRecordResponse> viewRecord(UUID userId);
}
