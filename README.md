# store-be

This is a full-stack web application built to streamline store management tasks. It allows users to set their store opening and closing hours for each day. A seem-less experience for Store management.

## Features

- Register a new user.
- Create a new Store.
- Retrieve the list of your stores.
- Manage your store opening and closing hours.
- User authentication and authorization for API endpoints.
- Secure API implementation to protect against common web application attacks.
- User friendly interface.

## Technologies Used

- Backend:
  - Node.js
  - Express

- Frontend:
  - Nesx.js
  - TailwindCSS

- Database:
  - PostgreSQL

- Authentication and Authorization:
  - JSON Web Tokens (JWT)
  - Passport

- Version Control:
  - Git (Hosted on GitHub)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SaadFarooq-Dev/store-be.git
2. Backend Setup:
  - Install PostgreSql
```bash
  npm install
  npm run db:create
  npm run db:migrate
  npm run db:seed
  npm run dev
  ```
  - Server will start at http://localhost:8080
1. Frontend Setup:
  ```bash
  cd ./client
  npm install
  npm run dev
  ```
  - Server will start at http://localhost:3000

1. Database Setup:
  - Local
    - Install PostgreSql
    - Update the .env with reference to .env-example

  - Production
    - Update the .env with reference to .env-example
    - Start the server

5. Access the Application:

- Open your web browser and visit http://localhost:3000 to access the application.

## Backend
The backend of the application is built using Node.js and Express. It provides the API endpoints for managing store opening and closing hours.

The backend directory contains the following files and folders:

- server.js: The entry point of the backend application.

- routes/api/: Defines the routes and handlers for the following:-
  - /auth.js: Defines the routes and handlers for the auth-related API
  - /store.js: Defines the routes and handlers for the store-related API
  - /openingHour.js: Defines the routes and handlers for the store-opening-and-closing-hours-related API
  -
- controllers/: Contains the controller functions for the following.
  - /auth.js: controller functions for handling the logic of auth operations.
  - /store.js: controller functions for handling the logic of store operations.
  - /openingHour.js: controller functions for handling the logic of store opening and closing hour operations.

- models/: Defines the model for the follwoing to interacting with the MongoDB database.
  - store.js: Defines the store schema
  - user.js: Defines the user schema
  - openinghours.js: Defines the store opening and closing hours schema

- middleware/: Defines the middleware functions for the follwoing
  - /jwtAuthenticate.js: Middleware for authentication and authorization.
  - /errorHandler.js: Error handling middleware.
- config/: Defines the configuration for database and passport

## API Reference

#### Register User

```
  POST /auth/signup
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| none| `name, email and password`    | `json` | Register a new user |

#### Login User

```
  POST /auth/login
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| none| `email and password`    | `json` | Login a user and return JWT token |

#### Create Store

```
  POST /store
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| x-auth-token| `name`    | `json` | Creates a store |

#### Get Stores

```
  GET /store
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| x-auth-token| `none`    | `none` | Get all user stores |

#### Update Store

```
  PATCH /store/${id}
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| x-auth-token| `name`    | `json` | Updates a store |


#### Delete store

```
  DELETE /store/${id}
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| x-auth-token | `none`    | `none` | Delete a store |

#### Create Store Opening Hours

```
  POST /store/${id}/openinghours
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| x-auth-token| `dayOfWeek,startTime,endTime`    | `json` | Creates a store opening hour |

#### Get Store Opening Hours

```
  GET /store/${id}/openinghours
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| x-auth-token| `none`    | `none` | Get store opening hours |

#### Update Store Opening Hours

```
  PATCH /store/${id}/openinghours/${openingHourId}
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| x-auth-token| `dayOfWeek,startTime,endTime`    | `json` | Updates a store opening hours |


#### Delete Store Opening Hours

```
  DELETE /store/${id}/openinghours
```

| Header | Body | Type     | Description                        |
| :--------| :-------- | :------- | :----------------------------------|
| x-auth-token | `dayOfWeek`    | `json` | Delete a store opening hours |


## Security Considerations
The application implements secure authentication and authorization using JSON Web Tokens (JWT).
Proper validation and sanitization of user inputs are performed to prevent common web application attacks, such as cross-site scripting (XSS) and SQL injection.
