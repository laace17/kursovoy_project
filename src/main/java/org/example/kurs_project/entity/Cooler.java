package org.example.kurs_project.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("COOLER")
@Getter
@Setter
public class Cooler extends Component {
    private String coolingType;
    private int maxTdp;
    private String socketSupport;
}