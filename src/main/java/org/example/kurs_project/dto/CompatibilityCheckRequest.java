package org.example.kurs_project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompatibilityCheckRequest {
    private Long cpuId;
    private Long motherboardId;
    private Long gpuId;
    private Long ramId;
    private Long coolerId;
    private Long storageId;
    private Long psuId;
    private Long caseId;
}