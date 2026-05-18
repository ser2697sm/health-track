package com.sergio.healthtrack.initialHealthRecordEntity.entity;

import com.sergio.healthtrack.common.GenderEnum;
import com.sergio.healthtrack.common.LevelActivityEnum;
import com.sergio.healthtrack.common.ObjectiveEnum;
import com.sergio.healthtrack.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "initialHealthRecordEntity")
public class InitialHealthRecordEntity {

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id",nullable = false)
    private UserEntity userId;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.ORDINAL)
    private GenderEnum gender;

    private int age;

    private BigDecimal height;

    private BigDecimal peso;

    private BigDecimal BodyFat;

    private BigDecimal MuscleMass;


    @Enumerated(EnumType.ORDINAL)
    private LevelActivityEnum levelActivity;

    @Enumerated(EnumType.ORDINAL)
    private ObjectiveEnum objective;

    private LocalDateTime createdAt;


}
