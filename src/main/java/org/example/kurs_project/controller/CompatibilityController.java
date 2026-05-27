package org.example.kurs_project.controller;

import lombok.RequiredArgsConstructor;
import org.example.kurs_project.dto.CompatibilityCheckRequest;
import org.example.kurs_project.service.CompatibilityService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/compatibility")
@RequiredArgsConstructor
public class CompatibilityController {

    private final CompatibilityService compatibilityService;

    @PostMapping("/check")
    public Map<String, Object> checkCompatibility(@RequestBody CompatibilityCheckRequest request) {
        return compatibilityService.checkCompatibility(request);
    }
}