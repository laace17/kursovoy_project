package org.example.kurs_project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompatibilityRequest {
    private Long cpuId;
    private Long motherboardId;
}