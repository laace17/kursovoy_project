package org.example.kurs_project.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("PSU")
@Getter
@Setter
public class PowerSupply extends Component {
    private int wattage;
    private String certificate;
}