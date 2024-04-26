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





### Task Requirments

## Task 1 : BACKEND: Python | Django
Develop a simple API web-app that provides CRUD endpoints for models described below use python with Django.

# Models:
Node { name: string , address: ipv4, status: int[offline/error/online] }

Analyzer { name: string, type: int[pe/doc/script] }

Task { task_id: int, object: uuid, status: int[waiting/processing/finished/error], creations_ts: datetime,  completed_ts: datetime, verdict: int[malicious/suspicious/clean]}

# There are following relationship between models:
Analyzer one to many with Task
Node many to many with Analyzer

### Task 2 : UI: React.js | Typescript | Redux-toolkit 
Develop an UI on top of previously created API, optimize loading time (i.e. avoid loading everything in one HTTP request, etc). Allow searches through displayed data and arbitrary ordering of it. UI should be responsive and UX friendly.

## Task 3 : Database: Redis
Create a simple worker app that consumes tasks stored in a redis database.
Each task has to be pushed for further processing to a cluster and the result returned by the cluster itself has to be stored via API in the backend created from the steps: 
Node that processed the task, task timestamp, etc.
Each node will expose just a POST API endpoint under ip:8080/analyze. It returns either HTTP 200 with task_id or one of the HTTP error codes.
The endpoint accepts as POST data the content of the `object` field preset in a task fetched from redis.
The node will process the task and once finished will push the result back to redis.

# Tasks stored in redis are json-serialized objects, of following shapes:
{ ‘op’: ‘result’, ‘task_id’: <int>, ‘status’: <int>, ‘verdict’: <str>}
{ ‘op’: ‘analyze’, ‘object’: <opaque>, ‘type’: <int>}

# Task 4 : Unit testing
Provide unit tests for all of the above projects, mock unimportant IO operations.

# Task 5 : Docker
Create a Dockerfile for it, optimize it towards the size of a final image and time to build.