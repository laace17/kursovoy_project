package org.example.kurs_project.service;

import org.example.kurs_project.entity.Component;
import org.example.kurs_project.repository.ComponentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComponentService {

    private final ComponentRepository componentRepository;

    public Component saveComponent(Component component) {
        return componentRepository.save(component);
    }

    public List<Component> getAllComponents() {
        return componentRepository.findAll();
    }

    public List<Component> getComponentsByType(String type) {
        return componentRepository.findAllByType(type);
    }
}