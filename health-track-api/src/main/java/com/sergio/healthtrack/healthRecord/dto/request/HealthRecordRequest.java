package com.sergio.healthtrack.healthRecord.dto.request;

import com.sergio.healthtrack.common.GenderEnum;
import com.sergio.healthtrack.common.LevelActivityEnum;
import com.sergio.healthtrack.common.ObjectiveEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record HealthRecordRequest(
        BigDecimal height,
        BigDecimal peso,
        int age,
        GenderEnum gender,
        BigDecimal bodyFat,
        BigDecimal muscleMass,
        @Enumerated(EnumType.ORDINAL)
        LevelActivityEnum levelActivity,
        @Enumerated(EnumType.ORDINAL)
        ObjectiveEnum objective
) {
}
