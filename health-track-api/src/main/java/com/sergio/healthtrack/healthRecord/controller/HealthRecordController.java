package com.sergio.healthtrack.healthRecord.controller;

import com.sergio.healthtrack.healthRecord.dto.request.HealthRecordRequest;
import com.sergio.healthtrack.healthRecord.service.HealthRecordService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/health-records")
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    public HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @PostMapping("create/{userId}")
    public ResponseEntity<?> create(
            @PathVariable UUID userId,
            @RequestBody @Valid HealthRecordRequest recordRequest) {
        healthRecordService.create(userId,recordRequest);
        return ResponseEntity.ok("Creado correctamente");
    }

    @GetMapping("viewRecord")
    public ResponseEntity<?> viewRecord() {
       return ResponseEntity.ok(healthRecordService.viewRecord());
    }
}
