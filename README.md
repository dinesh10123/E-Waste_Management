# E-Waste Management System ♻️

> A collaborative platform connecting Customers, Collectors, and Recyclers for efficient e-waste disposal and recycling.

## 📖 Overview

The **E-Waste Management System** is a microservices-based application designed to streamline the collection and processing of electronic waste. It facilitates a seamless workflow where:
1.  **Customers** schedule pickup requests for their e-waste.
2.  **Collectors** (Drivers) receive assignments and pick up the waste.
3.  **Recyclers** process the waste and generate disposal certificates.
4.  **Admins** manage the entire ecosystem.

The system features real-time tracking, secure authentication via Keycloak, and a role-based dashboard for all stakeholders.

---

## 🏗 System Architecture

The project follows a **Microservices Architecture** with the following components:

| Service | Port | Description |
| :--- | :--- | :--- |
| **User Service** | `8081` | Manages user registration, profiles, and Keycloak synchronization. |
| **Pickup Service** | `8082` | Handles creation and management of e-waste pickup requests. |
| **Tracking Service** | `8083` | Provides timeline updates and status tracking for requests. |
| **Assignment Service** | `8084` | Assigns pending requests to available collectors. |
| **Recycler Service** | `8086` | Manages the handover, decomposition, and certification process. |
| **API Gateway** | `8080` | Single entry point, handling routing and security (JWT validation). |
| **Eureka Server** | `9090` | Service discovery and registration server (`Driver_serv`). |
| **Keycloak** | `8085` | IAM solution for Authentication and Authorization. |

---

## 🛠 Tech Stack

### Backend
*   **Language:** Java 21
*   **Framework:** Spring Boot 3.2.5
*   **Database:** MySQL 8.0
*   **Security:** Spring Security, OAuth2 Resource Server (JWT)
*   **Communication:** OpenFeign (REST), Netflix Eureka (Discovery)

### Frontend
*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Styling:** Bootstrap 5, Vanilla CSS
*   **HTTP Client:** Axios (with Interceptors)

### DevOps & Tools
*   **Identity Provider:** Keycloak 23.0
*   **Containerization:** Docker
*   **Build Tools:** Maven (Backend), npm (Frontend)

---

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:
*   **Java Development Kit (JDK) 21**
*   **Node.js & npm** (Node 18+ recommended)
*   **Maven** (Apache Maven 3.8+)
*   **MySQL Server**
*   **Docker Desktop** (for running Keycloak)

---

## 🚀 Installation & Setup

### 1. Database Setup
Create a MySQL database named `E_waste`. The services are configured to use a local MySQL instance.

```sql
CREATE DATABASE E_waste;
```

> **Note:** The default configuration expects:
> *   **Username:** `root`
> *   **Password:** `Password`
>
> You can change this in `src/main/resources/application.properties` of each service if needed.

### 2. Keycloak Setup
Run Keycloak using Docker. This command sets up a fresh instance on port 8085.

```bash
docker run -p 8085:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:23.0.0 start-dev
```
*   Access Keycloak at `http://localhost:8085`.
*   **Config Required:** You must create the `ewaste-realm` and configure the client `ewaste-frontend` for the application to work.

### 3. Backend Setup
Navigate to the `BackEnd` directory. You will need to start the services in the following **specific order**:

1.  **Eureka Server** (`BackEnd/Driver_serv`)
2.  **User Service** (`BackEnd/User_Service`)
3.  **Pickup Service** (`BackEnd/pickup_request`)
4.  **Tracking Service** (`BackEnd/Tracking_Service`)
5.  **Assignment Service** (`BackEnd/Assignment_service`)
6.  **Recycler Service** (`BackEnd/Recycler_Service`)
7.  **API Gateway** (`BackEnd/api-gateway`)

**Command to run a service:**
```bash
cd <Service_Directory>
mvn spring-boot:run
```

### 4. Frontend Setup
Navigate to the frontend directory:
```bash
cd Ewaste_FrontEnd
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

---

## ⚡ Quick Start (Windows)

A batch script is included to automate the startup process for Windows users.

1.  Navigate to the project root `d:\Ewaste-update`.
2.  Double-click **`start_all_services.bat`**.
3.  The script will sequentially launch all backend services and the frontend in new windows.

---

## 📂 Project Structure

```
E-Waste-Update/
├── BackEnd/
│   ├── Driver_serv/          # Eureka Server
│   ├── api-gateway/          # Spring Cloud Gateway
│   ├── User_Service/         # User Management
│   ├── pickup_request/       # Pickup Request Management
│   ├── Assignment_service/   # Order Assignment Logic
│   ├── Recycler_Service/     # Recycling Process
│   └── Tracking_Service/     # Status Tracking
├── Ewaste_FrontEnd/          # React Application
└── start_all_services.bat    # Windows Startup Script
```

## 🤝 Contributing
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add NewFeature'`).
4.  Push to the branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.
