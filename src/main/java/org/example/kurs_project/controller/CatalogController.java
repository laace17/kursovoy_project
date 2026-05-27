package org.example.kurs_project.controller;

import lombok.RequiredArgsConstructor;
import org.example.kurs_project.service.ComponentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class CatalogController {

    private final ComponentService componentService;

    @GetMapping("/")
    public String showIndexPage() {
        return "index";
    }

    @GetMapping("/catalog")
    public String showCatalog(Model model) {
        model.addAttribute("components", componentService.getAllComponents());
        return "catalog";
    }
}