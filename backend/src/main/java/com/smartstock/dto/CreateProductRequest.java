package com.smartstock.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateProductRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 50)
    private String sku;

    @NotBlank
    private String category;

    private String brand;

    @NotNull
    @Min(0)
    private Integer stock;

    private String description;

    @NotBlank
    private String unit;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    private String barcode;

    @NotNull
    @Min(0)
    private Integer minReorderLevel;

    private String imageUrl;

    private Boolean enabled;
}
