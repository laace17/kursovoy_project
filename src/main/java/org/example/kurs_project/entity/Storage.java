package org.example.kurs_project.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("STORAGE")
@Getter
@Setter
public class Storage extends Component {
    private String storageType;
    private int capacityGb;
}