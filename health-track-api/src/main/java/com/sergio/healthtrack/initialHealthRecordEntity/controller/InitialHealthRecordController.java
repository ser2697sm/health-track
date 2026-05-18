package com.sergio.healthtrack.initialHealthRecordEntity.controller;

import com.sergio.healthtrack.initialHealthRecordEntity.dto.request.InitialHealthRecordRequest;
import com.sergio.healthtrack.initialHealthRecordEntity.service.InitialHealthRecordService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/health-records")
public class InitialHealthRecordController {

    private final InitialHealthRecordService healthRecordService;

    public InitialHealthRecordController(InitialHealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @PostMapping("create/{userId}")
    public ResponseEntity<?> create(
            @PathVariable UUID userId,
            @RequestBody @Valid InitialHealthRecordRequest recordRequest) {
        healthRecordService.create(userId,recordRequest);
        return ResponseEntity.ok("Creado correctamente");
    }

    @GetMapping("viewRecord/{userId}")
    public ResponseEntity<?> viewRecord( @PathVariable UUID userId) {
       return ResponseEntity.ok(healthRecordService.viewRecord(userId));
    }
}
