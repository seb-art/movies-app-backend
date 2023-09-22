# Movies App Backend

Welcome to the Movies App Backend repository! This backend server is the heart of our Movies App, providing the necessary APIs and functionality to manage and serve movie data to our application.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up and run the Movies App Backend on your local machine or deploy it to a server.

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js and npm (Node Package Manager): You can download and install them from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/seb-art/movies-app-backend.git
   ```

2. Change your working directory to the project folder:

   ```bash
   cd movies-app-backend
   ```

3. Install the project dependencies using npm:

   ```bash
   npm install
   ```

### Configuration

Before running the server, you'll need to configure your environment variables. Create a `.env` file in the project root directory and provide the following configurations:

```env
PORT=3000                 # Port for the server to listen on
DATABASE_URL=your-db-url  # URL for your database (e.g., MongoDB Atlas)
JWT_SECRET=your-secret    # Secret key for JWT token generation
```

## Usage

To start the Movies App Backend server, run the following command:

```bash
node index.js / nodemon index.js
```

By default, the server will run on the port specified in your `.env` file (or port 3000 if not specified). You can access the API at `http://localhost:3000` or the configured port.

### Endpoints

Here are the main API endpoints available:

- **GET /api/movies**: Get a list of all movies.
- **GET /api/movies/:id**: Get a single movie by ID.
- **POST /api/movies**: Create a new movie (requires authentication).
- **PUT /api/movies/:id**: Update an existing movie (requires authentication).
- **DELETE /api/movies/:id**: Delete a movie (requires authentication).

You can explore and test these endpoints using tools like Postman or curl.

## Authentication

Some API endpoints require authentication. To authenticate, include a valid JWT token in the `Authorization` header of your HTTP requests. You can obtain a JWT token by signing up and logging into the Movies App Frontend.

## Database

This backend uses a database to store and manage movie data. Make sure to configure the `DATABASE_URL` in your `.env` file to point to your database server.

## Contributing

We welcome contributions to the Movies App Backend! If you'd like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, concise commit messages.
4. Push your branch to your fork on GitHub.
5. Submit a pull request with a description of your changes.



Thank you for using the Movies App Backend! If you have any questions or need assistance, please feel free to reach out to us.
