# Products Crud

Welcome to the Product Crud project\! This is a Full-Stack web application developed to demonstrate a complete Product Management system, featuring Create, Read, Update, and Delete (CRUD) operations.

The application is divided into two main parts: a **backend** built with Node.js, Express, and Sequelize, which serves a RESTful API, and a reactive and modern **frontend** built with Next.js, React, and Tailwind CSS.

## 🚀 Features

The platform offers a fluid user experience for managing a product catalog.

### Frontend

  - **Product Listing:** View all registered products in a clear and organized table.
  - **Create New Products:** Add products to the catalog through an intuitive modal form.
  - **Edit Products:** Update the information of any existing product directly in the interface.
  - **Delete Products:** Remove products from the catalog with a single click.
  - **Dynamic Search:** Filter products in real-time by typing in the search bar.
  - **Reactive Interface:** The interface responds instantly to user actions, with visual feedback for loading and empty states.

### Backend

  - **Complete RESTful API:** Well-defined endpoints for all CRUD operations (`GET`, `POST`, `PUT`, `DELETE`).
  - **Database with Sequelize:** Uses the Sequelize ORM to abstract communication with the SQLite database.
  - **Server-Side Search:** An optimized endpoint to perform searches by name in the database, returning filtered results.
  - **Data Validation:** Uses Zod to validate input data during product creation and updates, ensuring data integrity.
  - **Error Handling:** A robust system to handle different types of errors (e.g., product not found, database conflicts, validation errors) and return clear responses to the client.

## 🛠️ Technologies Used

| Area | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | **Node.js** with **Express** | Creation of the RESTful API. |
| | **TypeScript** | Static typing for more robust code. |
| | **Sequelize** | ORM to interact with the database. |
| | **SQLite** | A lightweight, file-based relational database. |
| | **Zod** | A library for data schema validation. |
| | **CORS** | Allows the frontend to access API resources. |
| **Frontend** | **Next.js** with **React** | Framework for building the user interface. |
| | **TypeScript** | Static typing for components and logic. |
| | **Jotai** | A minimalist, atomic global state manager. |
| | **Tailwind CSS** | A CSS framework for rapid and customizable styling. |
| | **Axios** | An HTTP client to make requests to the backend API. |

## 🏛️ Architecture

The project is structured into two main folders, `frontend` and `backend`, functioning as a monorepo.

  - **`backend`**: Contains the RESTful API. It is responsible for all business logic, database communication, and data validation. It runs independently on a Node.js server.
  - **`frontend`**: Contains the client application developed in Next.js. It is responsible for presenting the user interface, capturing user interactions, and communicating with the backend API to fetch and manipulate data.

This separation ensures low coupling between the presentation and business logic layers, making it easier to maintain and scale both parts.

## ⚙️ How to Test Locally

To run this project on your local machine, follow the steps below.

### Prerequisites

  - Node.js (version 18 or higher)
  - npm or a compatible package manager

### 1\. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <PROJECT_FOLDER_NAME>
```

### 2\. Set up and Start the Backend

The backend and frontend have separate dependencies and servers. First, let's set up the backend.

1.  Open a terminal and navigate to the backend folder:

    ```bash
    cd backend
    ```

2.  Install the backend dependencies:

    ```bash
    npm install
    ```

3.  **Attention:** Create the database file. Sequelize with SQLite requires the file to exist. Create an **empty** file named `database.db` inside the `src/database` folder.

4.  Start the backend server:

    ```bash
    npm run dev
    ```

5.  You should see a confirmation message in the terminal, indicating that the server is running on port 4000:

    ```bash
    Database connection established successfully.
    Backend running on port: 4000
    ```

### 3\. Set up and Start the Frontend

Now, let's set up the frontend in a **new terminal**.

1.  Open a **new terminal** and navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2.  Install the frontend dependencies:

    ```bash
    npm install
    ```

3.  Start the frontend development server:

    ```bash
    npm run dev
    ```

4.  The Next.js server will start, usually on port 3000.

### 4\. Access the Application

With both servers running, open your browser and go to:

**[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)**

That's it\! You can now interact with the application by creating, searching, editing, and deleting products.
