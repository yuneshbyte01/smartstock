package com.smartstock.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private UUID id;
    private String name;
    private String sku;
    private String category;
    private String brand;
    private Integer stock;
    private String description;
    private String unit;
    private BigDecimal price;
    private String barcode;
    private Integer minReorderLevel;
    private String imageUrl;
    private Boolean enabled;
}
