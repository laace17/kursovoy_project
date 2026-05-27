package org.example.kurs_project.service;

import lombok.RequiredArgsConstructor;
import org.example.kurs_project.dto.CompatibilityCheckRequest;
import org.example.kurs_project.entity.*;
import org.example.kurs_project.repository.ComponentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CompatibilityService {

    private final ComponentRepository componentRepository;

    public Map<String, Object> checkCompatibility(CompatibilityCheckRequest request) {
        List<String> errors = new ArrayList<>();

        Cpu cpu = request.getCpuId() != null ? (Cpu) componentRepository.findById(request.getCpuId()).orElse(null) : null;
        Motherboard mobo = request.getMotherboardId() != null ? (Motherboard) componentRepository.findById(request.getMotherboardId()).orElse(null) : null;
        Gpu gpu = request.getGpuId() != null ? (Gpu) componentRepository.findById(request.getGpuId()).orElse(null) : null;
        Ram ram = request.getRamId() != null ? (Ram) componentRepository.findById(request.getRamId()).orElse(null) : null;
        Cooler cooler = request.getCoolerId() != null ? (Cooler) componentRepository.findById(request.getCoolerId()).orElse(null) : null;
        PowerSupply psu = request.getPsuId() != null ? (PowerSupply) componentRepository.findById(request.getPsuId()).orElse(null) : null;

        if (cpu != null && mobo != null) {
            if (!cpu.getSocket().equals(mobo.getSocket())) {
                errors.add("Конфликт сокетов: Процессор (" + cpu.getSocket() + ") не подходит к плате (" + mobo.getSocket() + ").");
            }
        }

        if (ram != null && mobo != null) {
            if (!mobo.getRamType().equals(ram.getRamType())) {
                errors.add("Конфликт памяти: Плата поддерживает " + mobo.getRamType() + ", а выбрана " + ram.getRamType() + ".");
            }
        }

        if (cooler != null && cpu != null) {
            if (cooler.getMaxTdp() < cpu.getTdp()) {
                errors.add("Опасность перегрева: Процессор выделяет " + cpu.getTdp() + "W тепла, а кулер отводит только " + cooler.getMaxTdp() + "W.");
            }
        }

        if (psu != null) {
            int totalPowerNeeded = 50;
            if (cpu != null) totalPowerNeeded += cpu.getTdp();
            if (gpu != null) totalPowerNeeded += gpu.getRecommendedPower();

            if (psu.getWattage() < totalPowerNeeded) {
                errors.add("Нехватка питания: Сборка потребляет около " + totalPowerNeeded + "W, а блок питания выдает только " + psu.getWattage() + "W.");
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("valid", errors.isEmpty());
        response.put("errorMessages", errors);
        return response;
    }
}