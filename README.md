# 📦 SmartStock

**SmartStock** is an AI-powered Inventory Management System with separate backend, frontend, and AI modules.

## 📁 Folder Structure

```
smartstock/
├── backend/ # 📡 Spring Boot REST API for inventory, products, users, etc.
├── frontend/ # 🖥️ React + Tailwind Admin Dashboard (PWA-ready)
├── ai-service/ # 🤖 FastAPI microservice for demand forecasting, anomaly detection
├── devops/ # 🛠️ Docker Compose, NGINX config, CI/CD pipelines
└── docs/ # 📚 Architecture diagrams, API specs, setup instructions
```


---

## ⚙️ Tech Stack

| Layer      | Technology                     |
|------------|---------------------------------|
| Backend    | Java, Spring Boot, PostgreSQL   |
| Frontend   | React, Tailwind CSS, Axios      |
| AI Module  | Python, FastAPI, TensorFlow     |
| DevOps     | Docker, Docker Compose, NGINX   |

---

## 🎯 Core Features

- 📦 Inventory & Product Management (CRUD)
- 🔄 Real-Time Stock Updates
- 📊 Sales and Stock Analytics
- 🤖 AI-based Demand Forecasting
- 🚨 Low Stock Anomaly Alerts
- 👥 Role-based Access (Admin, Manager)
- 📱 Mobile-friendly UI (PWA)
- 📤 CSV Export for Reports

---

## 🚀 Project Goals

- Help small to medium businesses digitize their inventory.
- Use AI to minimize overstocking and understocking.
- Provide a modular and scalable codebase.

---

## 🛠️ Getting Started

This project is structured as a monorepo. To run the full system locally:

```bash
git clone https://github.com/yuneshbyte01/smartstock.git
cd smartstock
docker-compose up --build
```

---