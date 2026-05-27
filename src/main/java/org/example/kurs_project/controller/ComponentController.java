package org.example.kurs_project.controller;

import org.example.kurs_project.entity.Component;
import org.example.kurs_project.service.ComponentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/components")
@RequiredArgsConstructor
public class ComponentController {

    private final ComponentService componentService;

    @GetMapping
    public List<Component> getComponents() {
        return componentService.getAllComponents();
    }
}