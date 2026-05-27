package org.example.kurs_project.controller;

import lombok.RequiredArgsConstructor;
import org.example.kurs_project.entity.User; // <--- ВОТ ОН, ТОТ САМЫЙ ПОТЕРЯННЫЙ ИМПОРТ!
import org.example.kurs_project.repository.BuildRepository;
import org.example.kurs_project.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MyBuildsController {

    private final BuildRepository buildRepository;
    private final UserRepository userRepository;

    @GetMapping("/builds")
    public String showMyBuilds(Model model) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(currentEmail).orElseThrow();

        model.addAttribute("builds", buildRepository.findByUser(user));

        return "builds";
    }
}