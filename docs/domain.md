# 📦 SmartStock Domain Model

## Core Entities

### 1. User
- id (UUID)
- username
- email
- password
- role (ADMIN, MANAGER, STAFF)
- createdAt

### 2. Product
- id
- name
- sku
- category
- unit
- price
- stock
- reorderThreshold

### 3. Supplier
- id
- name
- contact
- leadTime

### 4. Order
- id
- supplierId
- status
- createdAt
- totalAmount

### 5. StockTransaction
- id
- productId
- type (IN/OUT)
- quantity
- reason
- timestamp
- userId

### 6. Forecast
- id
- productId
- forecastDate
- expectedDemand
- recommendedStock

## Relationships
- User ↔ StockTransaction (1:M)
- Product ↔ StockTransaction (1:M)
- Product ↔ Forecast (1:M)
- Supplier ↔ Order (1:M)

---

## 🔐 User Roles and Access Levels

SmartStock has role-based access control with the following roles:

### 1. ADMIN
- Can create, update, and delete users
- Can manage products, suppliers, and purchase orders
- Has full access to all APIs and admin dashboards

### 2. MANAGER
- Can approve/reject purchase orders
- Can view reports and forecasts
- Cannot manage users

### 3. STAFF
- Can update stock levels
- Can record stock transactions (in/out/adjustment)
- Has no access to supplier or user management
