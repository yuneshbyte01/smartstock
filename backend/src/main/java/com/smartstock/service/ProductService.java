package com.smartstock.service;

import com.smartstock.model.Product;
import com.smartstock.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;

    public Product create(@Valid Product product) {
        return productRepo.save(product);
    }

    public List<Product> getAll() {
        return productRepo.findAll();
    }

    public Product getById(UUID id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
    }

    public Product update(UUID id, @Valid Product updatedProduct) {
        Product existing = getById(id);
        updatedProduct.setId(existing.getId()); // preserve original ID
        return productRepo.save(updatedProduct);
    }

    @Transactional
    public void delete(UUID id) {
        Product product = getById(id);
        product.setEnabled(false); // softly delete
        productRepo.save(product);
    }

    // Optional: Custom queries
    public List<Product> findByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    public Product findBySku(String sku) {
        return productRepo.findBySku(sku)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with SKU: " + sku));
    }
}
