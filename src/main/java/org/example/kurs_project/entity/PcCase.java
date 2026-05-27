package org.example.kurs_project.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("CASE")
@Getter
@Setter
public class PcCase extends Component {
    private String formFactor;
    private int maxGpuLengthMm;
}