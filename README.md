# Minimal WebSocket Chat App

This is a minimal real-time chat application built with **Spring Boot**, **React.js**, and **Tailwind CSS**. It utilizes WebSockets to enable seamless live communication between users.

## Features
- Real-time messaging with WebSockets
- Backend powered by **Spring Boot**
- Frontend built with **React.js** and **Tailwind CSS**
- Minimal and elegant UI

---

## Project Structure
```
chatapp/
├── chat-app-backend/   # Spring Boot backend
│   ├── src/main/java/com/jashan/chat/   # Java source code
│   ├── src/main/resources/              # Configuration files
│   ├── pom.xml                           # Maven dependencies
│
├── chat-app-frontend/   # React frontend
│   ├── src/                            # React components
│   ├── tailwind.config.js              # Tailwind CSS setup
│   ├── package.json                     # Frontend dependencies
```

## Getting Started

### 1. Backend Setup (Spring Boot)
#### Prerequisites:
- JDK 17+
- Maven

#### Steps:
1. Navigate to the backend directory:
   ```sh
   cd chat-app-backend
   ```
2. Build and run the Spring Boot server:
   ```sh
   mvn spring-boot:run
   ```
3. The backend will start on **http://localhost:8080**.

### 2. Frontend Setup (React + Tailwind)
#### Prerequisites:
- Node.js (18+ recommended)
- npm or yarn

#### Steps:
1. Navigate to the frontend directory:
   ```sh
   cd chat-app-frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. The frontend will be available at **http://localhost:5173**.

## WebSocket Integration
The app uses WebSockets for real-time messaging. The WebSocket endpoint is:
```
ws://localhost:8080/chat
```
Clients can connect and exchange messages in real time using this WebSocket API.

