package org.example.kurs_project.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("GPU")
@Getter
@Setter
public class Gpu extends Component {
    private int videoMemory;
    private int recommendedPower;
}