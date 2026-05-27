package org.example.kurs_project.service;

import lombok.RequiredArgsConstructor;
import org.example.kurs_project.dto.BuildSaveRequest;
import org.example.kurs_project.entity.*;
import org.example.kurs_project.repository.BuildRepository;
import org.example.kurs_project.repository.ComponentRepository;
import org.example.kurs_project.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BuildService {

    private final BuildRepository buildRepository;
    private final ComponentRepository componentRepository;
    private final UserRepository userRepository;

    public void saveBuild(BuildSaveRequest request) {
        Build build = new Build();
        build.setName(request.getName());

        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        userRepository.findByEmail(currentEmail).ifPresent(build::setUser);

        if (request.getCpuId() != null) {
            componentRepository.findById(request.getCpuId()).ifPresent(comp -> build.setCpu((Cpu) comp));
        }
        if (request.getMotherboardId() != null) {
            componentRepository.findById(request.getMotherboardId()).ifPresent(comp -> build.setMotherboard((Motherboard) comp));
        }
        if (request.getGpuId() != null) {
            componentRepository.findById(request.getGpuId()).ifPresent(comp -> build.setGpu((Gpu) comp));
        }
        if (request.getRamId() != null) {
            componentRepository.findById(request.getRamId()).ifPresent(comp -> build.setRam((Ram) comp));
        }
        if (request.getCoolerId() != null) {
            componentRepository.findById(request.getCoolerId()).ifPresent(comp -> build.setCooler((Cooler) comp));
        }
        if (request.getStorageId() != null) {
            componentRepository.findById(request.getStorageId()).ifPresent(comp -> build.setStorage((Storage) comp));
        }
        if (request.getPsuId() != null) {
            componentRepository.findById(request.getPsuId()).ifPresent(comp -> build.setPsu((PowerSupply) comp));
        }
        if (request.getCaseId() != null) {
            componentRepository.findById(request.getCaseId()).ifPresent(comp -> build.setPcCase((PcCase) comp));
        }

        buildRepository.save(build);
    }

    public void deleteBuild(Long id) {
        buildRepository.deleteById(id);
    }
}