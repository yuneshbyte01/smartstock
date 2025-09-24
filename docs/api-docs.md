
# 📦 Product Management API - SmartStock

All product routes are prefixed with:

```
/api/products
```

---

## 🔄 Authentication

All endpoints require a Bearer token (`Authorization: Bearer <token>`).

---

## 🟢 GET /api/products

**Description:** Get all products  
**Roles Allowed:** `ADMIN`, `MANAGER`, `STAFF` 
**Query Params (optional):**  

- `category` (string)
- `enabled` (boolean)

**Returns:** List of products  

```json
[
  {
    "id": "uuid",
    "name": "Rice",
    "sku": "RICE001",
    "category": "Grains",
    "brand": "Annapurna",
    "unit": "kg",
    "price": 100.0,
    "stock": 40,
    "enabled": true
  }
]
```

---

## 🔵 GET /api/products/{id}

**Description:** Get product by ID  
**Roles Allowed:** `ADMIN`, `MANAGER`, `STAFF`  
**Path Param:** `id` (UUID)  
**Returns:** Product object  

---

## 🟡 POST /api/products

**Description:** Create new product  
**Roles Allowed:** `ADMIN`, `MANAGER`

**Body:**  

```json
{
  "name": "Rice",
  "sku": "RICE001",
  "category": "Grains",
  "brand": "Annapurna",
  "unit": "kg",
  "price": 100.0,
  "stock": 50,
  "barcode": "123456789",
  "description": "Organic rice",
  "minReorderLevel": 20,
  "imageUrl": "https://example.com/image.jpg",
  "enabled": true
}
```

---

## 🟠 PUT /api/products/{id}

**Description:** Update product  
**Roles Allowed:** `ADMIN`, `MANAGER` 
**Path Param:** `id` (UUID)  

**Body:** Same as POST  

---

## 🔴 DELETE /api/products/{id}

**Description:** Soft-delete product (set `enabled: false`)  
**Roles Allowed:** `ADMIN`, `MANAGER`

---

## 📋 Notes

- All fields are validated with appropriate constraints
- `enabled` is used to indicate stock visibility
- `sku` must be unique

---
