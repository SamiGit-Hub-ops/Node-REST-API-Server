# 💸 Node.js RESTful API Webserver

## 🚀 Overview
A high-performance RESTful API webserver built from scratch using **Node.js** and **Express**. This project demonstrates a clean **MVC (Model-View-Controller)** architecture designed to handle asynchronous client requests with high reliability and data persistence via **MongoDB**.

## 🛠️ Key Features & Technical Highlights
* **Full CRUD Implementation**: Handles Create, Read, Update, and Delete operations for user management.
* **MVC Architecture**: Separated concerns into Models (Data), Controllers (Logic), and Routes (Endpoints) for better scalability.
* **DSA Optimization**: 
    * Implemented **Unique Indexing** on the `email` field in the User Schema to ensure $O(\log n)$ lookup efficiency.
    * Optimized request handling using non-blocking asynchronous patterns to maintain high throughput.
* **Persistent Logging**: Custom middleware tracks all incoming requests and server responses in `log.txt`.
* **Secure Configuration**: Managed sensitive database credentials using **Dotenv** for environment variables.

## 🏗️ Project Structure
```text
/Node_REST_API_Server
  ├── controllers/  # Business logic
  ├── models/       # Data schemas (Mongoose)
  ├── routes/       # API endpoints
  ├── middlewares/  # Custom loggers
  ├── .env          # Environment variables (Excluded for security)
  ├── index.js      # Server entry point
  └── connection.js # Database connectivity