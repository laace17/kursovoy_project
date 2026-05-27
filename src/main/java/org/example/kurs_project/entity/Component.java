package org.example.kurs_project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "components")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Getter
@Setter
@NoArgsConstructor
public abstract class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private BigDecimal price;

    @Column(insertable = false, updatable = false)
    private String type;
    private String imageUrl;

    public String getImageUrl() {
        String type = this.getClass().getSimpleName();
        String name = this.getName() != null ? this.getName().toUpperCase() : "";

        switch (type) {
            case "Cpu":
                if (name.contains("I3")) return "/images/cpu/i3.jpg";
                if (name.contains("I5")) return "/images/cpu/i5.jpg";
                if (name.contains("I7")) return "/images/cpu/i7.jpg";
                if (name.contains("I9")) return "/images/cpu/i9.jpg";
                if (name.contains("RYZEN 5")) return "/images/cpu/r5.jpg";
                if (name.contains("RYZEN 7")) return "/images/cpu/r7.jpg";
                if (name.contains("RYZEN 9") || name.contains("THREADRIPPER")) return "/images/cpu/r9.jpg";
                return "https://placehold.co/400x200/f8f9fa/0d6efd?text=CPU";

            case "Gpu": return "https://placehold.co/400x200/f8f9fa/198754?text=Видеокарта";
            case "Motherboard":
                if (brand.contains("GIGABYTE")) return "/images/motherboard/gigabyte.jpg";
                if (brand.contains("MSI")) return "/images/motherboard/msi.jpg";
                if (name.contains("I7")) return "/images/cpu/i7.jpg";
                if (name.contains("I9")) return "/images/cpu/i9.jpg";
                return "https://placehold.co/400x200/f8f9fa/dc3545?text=Материнская+плата";
            case "Ram": return "https://placehold.co/400x200/f8f9fa/0dcaf0?text=ОЗУ";
            case "Cooler": return "https://placehold.co/400x200/f8f9fa/6c757d?text=Охлаждение";
            case "Storage": return "https://placehold.co/400x200/f8f9fa/212529?text=Накопитель";
            case "PowerSupply": return "https://placehold.co/400x200/f8f9fa/ffc107?text=Блок+питания";
            case "PcCase": return "https://placehold.co/400x200/f8f9fa/d63384?text=Корпус";
            default: return "https://placehold.co/400x200/f8f9fa/6c757d?text=Нет+фото";
        }
    }
}