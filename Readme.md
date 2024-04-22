# Task Manager Application
# by Aviv Perets : https://github.com/avivperets26

This application is a task manager where users can create, update, and delete tasks. It's built using a Python/Django backend, a Vite/React frontend, and Redis for the database. The application is containerized using Docker for easy setup and deployment.

## Backend

The backend is built with Python and Django. Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel.

## Frontend

The frontend is built with Vite, React.js, and TypeScript. 

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Vitest**: A fast and lightweight testing framework designed specifically for Vite.
- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.
- **CSS Modules**: A CSS file in which all class names and animation names are scoped locally by default.


The application also uses Redux Toolkit for state management and CSS modules for styling.

## Installation Steps

1. Clone the project from the git repository.
2. Install the dependencies using `npm install`.
3. Run the application using `vite`.
4. Run the tests using `vitest` or `npm test`.

## Testing

The application uses Vitest for testing. Vitest is a fast and lightweight testing framework designed specifically for Vite. It supports both unit and end-to-end testing.

## Database

The application uses Redis as its database. Redis is an open-source, in-memory data structure store, used as a database, cache, and message broker.

## CI/CD

The application is containerized using Docker, which simplifies deployment and ensures the application runs the same way in every environment.

## Installation Steps

1. Build the Docker image: `docker build -t <app name> .`
2. Run the Docker container: `docker run -p 8000:8000 <app name>`

Replace `<app name>` with the name you want to give to your Docker image.

## Additional Tools

Postman is used for testing the API endpoints.

Please follow the installation steps to set up the project. If you encounter any issues, feel free to reach out.