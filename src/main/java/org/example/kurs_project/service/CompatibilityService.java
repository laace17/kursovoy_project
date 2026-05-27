package org.example.kurs_project.service;

import lombok.RequiredArgsConstructor;
import org.example.kurs_project.dto.CompatibilityCheckRequest;
import org.example.kurs_project.entity.*;
import org.example.kurs_project.repository.ComponentRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CompatibilityService {

    private final ComponentRepository componentRepository;

    public Map<String, Object> checkCompatibility(CompatibilityCheckRequest req) {
        List<String> errors = new ArrayList<>();

        Cpu        cpu    = load(req.getCpuId(),          Cpu.class);
        Motherboard mobo  = load(req.getMotherboardId(),  Motherboard.class);
        Gpu        gpu    = load(req.getGpuId(),          Gpu.class);
        Ram        ram    = load(req.getRamId(),           Ram.class);
        Cooler     cooler = load(req.getCoolerId(),        Cooler.class);
        PowerSupply psu   = load(req.getPsuId(),           PowerSupply.class);
        PcCase     pcCase = load(req.getCaseId(),          PcCase.class);

        // ── 1. Сокет: CPU ↔ Материнская плата ──────────────────────────────
        if (cpu != null && mobo != null) {
            if (!cpu.getSocket().equals(mobo.getSocket())) {
                errors.add("Несовместимый сокет: процессор " + cpu.getSocket()
                        + " не подходит к материнской плате " + mobo.getSocket() + ".");
            }
        }

        // ── 2. Тип памяти: Материнская плата ↔ ОЗУ ─────────────────────────
        if (mobo != null && ram != null) {
            if (!mobo.getRamType().equalsIgnoreCase(ram.getRamType())) {
                errors.add("Несовместимая память: плата поддерживает " + mobo.getRamType()
                        + ", а выбрана " + ram.getRamType() + ".");
            }
        }

        // ── 3. TDP: Кулер ↔ Процессор ───────────────────────────────────────
        if (cpu != null && cooler != null) {
            if (cooler.getMaxTdp() < cpu.getTdp()) {
                errors.add("Опасность перегрева: процессор выделяет " + cpu.getTdp()
                        + " Вт тепла, а кулер отводит только " + cooler.getMaxTdp() + " Вт.");
            }
        }

        // ── 4. Питание: Блок питания ↔ CPU + GPU ────────────────────────────
        if (psu != null && (cpu != null || gpu != null)) {
            int needed = 50; // системные нужды
            if (cpu != null) needed += cpu.getTdp();
            if (gpu != null) needed += gpu.getRecommendedPower();
            if (psu.getWattage() < needed) {
                errors.add("Нехватка питания: сборка потребляет ~" + needed
                        + " Вт, а блок питания выдаёт только " + psu.getWattage() + " Вт.");
            }
        }

        // ── 5. Форм-фактор: Материнская плата ↔ Корпус ──────────────────────
        if (mobo != null && pcCase != null) {
            String mbFf   = mobo.getFormFactor();
            String caseFf = pcCase.getFormFactor();
            if (mbFf != null && caseFf != null && !formFactorFits(mbFf, caseFf)) {
                errors.add("Несовместимый форм-фактор: материнская плата " + mbFf
                        + " не помещается в корпус " + caseFf + ".");
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("valid", errors.isEmpty());
        result.put("errorMessages", errors);
        return result;
    }

    /**
     * Возвращает true, если материнская плата данного форм-фактора
     * физически помещается в корпус данного типа.
     *
     * Правило: бо́льший корпус вмещает меньшую плату.
     *   ATX-корпус     → ATX / Micro-ATX / Mini-ITX
     *   Micro-ATX      → Micro-ATX / Mini-ITX
     *   Mini-Tower     → Micro-ATX / Mini-ITX  (компактный, ATX не влезет)
     *   Mini-ITX       → только Mini-ITX
     */
    private boolean formFactorFits(String mbFf, String caseFf) {
        return switch (mbFf) {
            case "ATX" -> caseFf.equals("ATX");
            case "Micro-ATX" -> caseFf.equals("ATX")
                    || caseFf.equals("Micro-ATX")
                    || caseFf.equals("Mini-Tower");
            case "Mini-ITX" -> true; // Mini-ITX влезает в любой корпус
            default -> true;         // неизвестный форм-фактор — не блокируем
        };
    }

    @SuppressWarnings("unchecked")
    private <T extends org.example.kurs_project.entity.Component> T load(Long id, Class<T> type) {
        if (id == null) return null;
        org.example.kurs_project.entity.Component comp =
                componentRepository.findById(id).orElse(null);
        if (comp == null) return null;
        try {
            return type.cast(comp);
        } catch (ClassCastException e) {
            return null;
        }
    }
}
