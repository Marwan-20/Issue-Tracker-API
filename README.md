# Issue Tracker API

## Description

A simple RESTful API for tracking projects and their issues. Users can manage multiple projects, and each project can contain multiple issues.

The API allows users to create, view, update, and delete projects and issues.

## Features

- Create, view, update, and delete users
- Manage multiple projects for each user
- Create and manage issues associated with projects
- Retrieve projects and their related issues
- Store application data in a relational database


## Tech Stack

- **Node.js** — JavaScript runtime
- **TypeScript** — Programming language
- **Express.js** — Web framework
- **MySQL** — Relational database
- **mysql2** — MySQL driver for Node.js

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- MySQL Server

## Installation

1. Clone the repository:

   ```bash
   git clone https://githup.com/Marwan-20/Issue_Tracker_API
   ```

2. Navigate to the project directory:

   ```bash
   cd API_issue_tracker
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create the MySQL database and the required tables.

5. Configure the database connection and environment variables in your `.env` file, according to your application configuration.

## Running the Project

Run the application using the appropriate command configured in `package.json`.

For example, if your project uses `tsx`:

```bash
npx tsx server.ts
```

## API Endpoints

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Retrieve all users |
| POST | `/users` | Create a new user |
| GET | `/users/:id` | Retrieve a user by ID |
| PATCH | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/projects` | Retrieve all projects |
| POST | `/projects` | Create a new project |
| GET | `/projects/:id` | Retrieve a project by ID |
| PATCH | `/projects/:id` | Update a project |
| DELETE | `/projects/:id` | Delete a project |

### Issues

| Method | Endpoint | Description |
|---|---|---|
| POST | `/projects/:projectId/issues` | Create an issue for a project |
| GET | `/projects/:projectId/issues` | Retrieve all issues for a project |
| GET | `/issues/:id` | Retrieve an issue by ID |
| PATCH | `/issues/:id` | Update an issue |
| DELETE | `/issues/:id` | Delete an issue |


## Future Improvements

- Implement password hashing
- Add authentication and authorization
- Improve input validation and error handling
- Add automated tests

