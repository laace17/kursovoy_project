package org.example.kurs_project.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
}
