package com.smartstock.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "purchase_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    @NotNull
    private Supplier supplier;

    @Enumerated(EnumType.STRING)
    @NotNull
    private OrderStatus status;

    @PastOrPresent
    private LocalDateTime createdAt;

    @DecimalMin(value = "0.0")
    private BigDecimal totalAmount;
}
