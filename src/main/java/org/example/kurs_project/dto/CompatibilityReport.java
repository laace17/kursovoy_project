package org.example.kurs_project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CompatibilityReport {
    private boolean isValid;
    private List<String> errorMessages;
}