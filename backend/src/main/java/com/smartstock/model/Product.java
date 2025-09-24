package com.smartstock.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "products", uniqueConstraints = {
        @UniqueConstraint(columnNames = "sku")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, unique = true)
    private String sku;

    @NotBlank
    @Column(nullable = false)
    private String category;

    private String brand;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank
    @Column(nullable = false)
    private String unit;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    private String barcode;

    @NotNull
    @Min(0)
    private Integer minReorderLevel;

    private String imageUrl;

    @NotNull
    private Boolean enabled = true;
}
