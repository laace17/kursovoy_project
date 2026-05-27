package org.example.kurs_project.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("MOTHERBOARD")
@Getter
@Setter
public class Motherboard extends Component {
    private String socket;
    private String ramType;
    private String chipset;
    private String formFactor; // ATX, Micro-ATX, Mini-ITX
}