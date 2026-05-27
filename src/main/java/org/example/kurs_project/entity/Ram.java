package org.example.kurs_project.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("RAM")
@Getter
@Setter
public class Ram extends Component {
    private String ramType;
    private int capacityGb;
    private int frequencyMhz;
}