package org.example.kurs_project.controller;

import lombok.RequiredArgsConstructor;
import org.example.kurs_project.dto.BuildSaveRequest;
import org.example.kurs_project.entity.Build;
import org.example.kurs_project.entity.User;
import org.example.kurs_project.repository.BuildRepository;
import org.example.kurs_project.repository.UserRepository;
import org.example.kurs_project.service.BuildService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/builds")
@RequiredArgsConstructor
public class BuildController {

    private final BuildService buildService;
    private final BuildRepository buildRepository;
    private final UserRepository userRepository;

    /** Список сборок текущего пользователя */
    @GetMapping
    public List<Build> getMyBuilds() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return buildRepository.findByUser(user);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveBuild(@RequestBody BuildSaveRequest request) {
        buildService.saveBuild(request);
        return ResponseEntity.ok("Сборка успешно сохранена!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBuild(@PathVariable Long id) {
        buildService.deleteBuild(id);
        return ResponseEntity.ok("Сборка удалена!");
    }
}