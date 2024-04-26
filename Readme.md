# Task Manager Application
# by Aviv Perets : https://github.com/avivperets26

This application is a task manager where users can create, update, and delete tasks. It's built using a Python/Django backend, a Vite/React frontend, and Redis for the database. The application is containerized using Docker for easy setup and deployment.

## Installation Steps

1. Clone the project from the git repository.
2. docker-compose up --build

run the following commands in the terminal:
```bash 
git clone
cd task-manager
docker-compose up --build
```

## Backend API
The backend is built with Python and Django. Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel.
The backend API has the following endpoints:

- **GET /api/tasks/**: Get all tasks.
- **POST /api/tasks/**: Create a new task.
- **GET /api/tasks/:id/**: Get a task by ID.
- **PUT /api/tasks/:id/**: Update a task by ID.
- **DELETE /api/tasks/:id/**: Delete a task by ID.
- **GET /api/nodes/**: Get all nodes.
- **POST /api/nodes/**: Create a new node.
- **GET /api/nodes/:id/**: Get a node by ID.
- **PUT /api/nodes/:id/**: Update a node by ID.
- **DELETE /api/nodes/:id/**: Delete a node by ID.
- **GET /api/analyzers/**: Get all analyzers.
- **POST /api/analyzers/**: Create a new analyzer.
- **GET /api/analyzers/:id/**: Get an analyzer by ID.
- **PUT /api/analyzers/:id/**: Update an analyzer by ID.
- **DELETE /api/analyzers/:id/**: Delete an analyzer by ID.
- **GET /api/tasks/:id/analyze/**: Analyze a task by ID.
- **GET /api/tasks/:id/result/**: Get the result of a task by ID.

## Frontend

The frontend is built with Vite, React.js, and TypeScript. 
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Vitest**: A fast and lightweight testing framework designed specifically for Vite.
- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.
- **CSS Modules**: A CSS file in which all class names and animation names are scoped locally by default.

The frontend has the following pages:

- **Home**: Displays all tasks.
- **Create Task**: Allows users to create a new task.
- **Update Task**: Allows users to update an existing task.
- **Delete Task**: Allows users to delete a task.
- **Task Details**: Displays the details of a task.
- **Analyzer List**: Displays all analyzers.
- **Analyze Task**: Allows users to analyze a task.
- **Result Task**: Displays the result of a task.
- **404**: Displays a 404 error page.
- **500**: Displays a 500 error page.
- **Loading**: Displays a loading spinner.
- **Error**: Displays an error message.
- **Header**: Displays the header with navigation links.
- **Footer**: Displays the footer with social media links.
- **Task Item**: Displays a single task.

The frontend uses React Router for routing and Axios for making HTTP requests.

## Styling

The application uses CSS modules for styling. CSS modules are a way to write CSS that's scoped to a single component, which makes it easier to manage styles and avoid naming conflicts.

## State Management

The application uses Redux Toolkit for state management. Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.

## Form Validation

The application uses Yup for form validation. Yup is a JavaScript schema builder for value parsing and validation.

## Error Handling

The application uses Axios interceptors to handle errors globally. Axios interceptors allow you to run your code or modify the request or response before the request or response is sent or received.

## Loading State

The application uses a loading spinner to indicate when data is being fetched. The loading spinner is displayed while the data is being fetched and hidden once the data has been fetched.

## Error State

The application displays an error message when an error occurs. The error message is displayed when an error occurs and hidden once the error has been resolved.

## Responsive Design

The application is responsive and works on all devices. It uses CSS media queries to adjust the layout based on the screen size.

## SEO

The application uses React Helmet to manage the document head of the application. React Helmet is a reusable React component that manages all of your changes to the document head.

## Accessibility

The application is accessible and follows best practices for web accessibility. It uses semantic HTML elements, ARIA attributes, and focus management to ensure that the application is usable by everyone.

## Performance

The application is optimized for performance and follows best practices for web performance. It uses lazy loading, code splitting, and image optimization to ensure that the application loads quickly and runs smoothly.

## Security

The application is secure and follows best practices for web security. It uses HTTPS, content security policy, and input validation to prevent common security vulnerabilities.

## Code Quality

The application follows best practices for code quality and maintainability. It uses ESLint and Prettier to enforce code style and formatting rules.

## Documentation

The application is well-documented and follows best practices for documentation. It uses JSDoc comments to document the code and explain how it works.

## Unit Testing

The application uses Jest and React Testing Library for unit testing. Jest is a JavaScript testing framework designed to ensure correctness and React Testing Library is a simple and complete testing library for React.

The application uses Vitest for testing. Vitest is a fast and lightweight testing framework designed specifically for Vite. It supports both unit and end-to-end testing.

The application has unit tests for the components, hooks, and utilities. The tests cover the happy path and edge cases to ensure the code works as expected.

## Django Testing

The application uses Django's built-in testing framework for testing the backend API. The tests cover the happy path and edge cases to ensure the API endpoints work as expected.

## Database

The application uses Redis as its database. Redis is an open-source, in-memory data structure store, used as a database, cache, and message broker.

## CI/CD

The application is containerized using Docker, which simplifies deployment and ensures the application runs the same way in every environment.

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