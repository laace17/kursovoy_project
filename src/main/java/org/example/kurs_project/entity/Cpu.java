package org.example.kurs_project.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("CPU")
@Getter
@Setter
public class Cpu extends Component {
    private String socket;
    private int tdp;
    private String ramTypeSupport;
    private int cores;
}