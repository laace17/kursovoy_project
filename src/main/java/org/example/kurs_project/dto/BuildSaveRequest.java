package org.example.kurs_project.dto;

import lombok.Data;

@Data
public class BuildSaveRequest {
    private String name;

    private Long cpuId;
    private Long motherboardId;
    private Long gpuId;
    private Long ramId;
    private Long coolerId;
    private Long storageId;
    private Long psuId;
    private Long caseId;
}