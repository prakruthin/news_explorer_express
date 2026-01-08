# NewsExplorer

A Node.js + Express backend for a news application that allows users to manage accounts and save news articles from third-party APIs.

## Frontend Repository

The frontend for this project is available here:  
[NewsExplorer Frontend](#https://github.com/prakruthin/news_explorer_react)

## Features

### User Management

| Method | Endpoint  | Description                                           |
| ------ | --------- | ----------------------------------------------------- |
| POST   | /signup   | Register a new user (name, email, password).          |
| POST   | /signin   | Login with email and password to receive a JWT token. |
| GET    | /users/me | Get details of the currently authenticated user.      |

### Articles

| Method | Endpoint             | Description                                          |
| ------ | -------------------- | ---------------------------------------------------- |
| GET    | /articles            | Fetch all saved articles (authenticated users only). |
| POST   | /articles            | Save a new article (authenticated users only).       |
| DELETE | /articles/:articleId | Delete your own saved article only.                  |

### Authentication & Authorization

- JWT-based authentication using `Bearer <token>` in the Authorization header.
- Protected routes require a valid token (`/users/me`, `/articles`).
- Users can only delete their own articles.

## Error Handling

| Code | Meaning               | Description                               |
| ---- | --------------------- | ----------------------------------------- |
| 400  | Bad Request           | Invalid data or malformed ID.             |
| 401  | Unauthorized          | Missing or invalid authentication token.  |
| 403  | Forbidden             | Attempt to delete another user's article. |
| 404  | Not Found             | Resource does not exist.                  |
| 409  | Conflict              | Email already exists.                     |
| 500  | Internal Server Error | Server-side error.                        |

## Tech Stack

- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database and ODM
- **JWT (jsonwebtoken)** — Authentication
- **bcryptjs** — Password hashing
- **Validator.js** — Input validation
- **Helmet** — Security
- **ESLint (Airbnb)** — Code linting

## Installation & Setup

1.  **Clone the repo**

```bash
git clone https://github.com/prakruthin/news-explorer-backend.git
cd news-explorer-backend
```

2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run MongoDB locally**
    Make sure MongoDB is running on:

    ```bash
    mongodb://127.0.0.1:27017/news-explorer-db
    ```

4.  **Start the server**

    ```bash
    npm run start
    ```

    Or, for development with hot-reload:

    ```
    npm run dev
    ```

## Future Improvements

- Cloud storage for images.

- CI/CD pipeline with GitHub Actions.
