package com.smartstock.service;

import com.smartstock.dto.*;
import com.smartstock.model.Product;
import com.smartstock.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;

    public ProductResponse create(CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .sku(request.getSku())
                .category(request.getCategory())
                .brand(request.getBrand())
                .stock(request.getStock())
                .description(request.getDescription())
                .unit(request.getUnit())
                .price(request.getPrice())
                .barcode(request.getBarcode())
                .minReorderLevel(request.getMinReorderLevel())
                .imageUrl(request.getImageUrl())
                .enabled(request.getEnabled() != null ? request.getEnabled() : true)
                .build();

        return toResponse(productRepo.save(product));
    }

    public List<ProductResponse> getAll() {
        return productRepo.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getById(UUID id) {
        return toResponse(findProduct(id));
    }

    public ProductResponse update(UUID id, UpdateProductRequest request) {
        Product existing = findProduct(id);

        existing.setName(request.getName());
        existing.setSku(request.getSku());
        existing.setCategory(request.getCategory());
        existing.setBrand(request.getBrand());
        existing.setStock(request.getStock());
        existing.setDescription(request.getDescription());
        existing.setUnit(request.getUnit());
        existing.setPrice(request.getPrice());
        existing.setBarcode(request.getBarcode());
        existing.setMinReorderLevel(request.getMinReorderLevel());
        existing.setImageUrl(request.getImageUrl());
        existing.setEnabled(request.getEnabled());

        return toResponse(productRepo.save(existing));
    }

    @Transactional
    public void delete(UUID id) {
        Product product = findProduct(id);
        product.setEnabled(false);
        productRepo.save(product);
    }

    public List<ProductResponse> findByCategory(String category) {
        return productRepo.findByCategory(category)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse findBySku(String sku) {
        return toResponse(
                productRepo.findBySku(sku)
                        .orElseThrow(() -> new EntityNotFoundException("Product not found with SKU: " + sku))
        );
    }

    private Product findProduct(UUID id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
    }

    private ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .sku(p.getSku())
                .category(p.getCategory())
                .brand(p.getBrand())
                .stock(p.getStock())
                .description(p.getDescription())
                .unit(p.getUnit())
                .price(p.getPrice())
                .barcode(p.getBarcode())
                .minReorderLevel(p.getMinReorderLevel())
                .imageUrl(p.getImageUrl())
                .enabled(p.getEnabled())
                .build();
    }
}
