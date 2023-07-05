# Bookmarking Application

This is an innovative bookmarking application built with Node.js, Express, and MongoDB. It provides a user-friendly interface for securely bookmarking favorite websites. The application incorporates features such as a secure signup/login system with email verification and JSON Web Tokens (JWT) for authentication.

## Features

- User-friendly interface for managing bookmarks
- Secure signup and login system with email verification
- Integration of JSON Web Tokens (JWT) for authentication
- MongoDB as the database for efficient data storage
- Utilization of Docker containers for easy deployment
- Secure storage of sensitive information using environment variables

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/bookmarking-app.git

2. Install the dependencies:
   npm install
   
3. Set up the environment variables:
   Create a .env file in the root directory of the project and add the following environment variables to the .env file:<br>
   a. MONGO_URL=<your_mongo_db_connection_url><br>
   b. GMAIL=<your_gmail_address><br>
   c. GMAIL_APP_PASSWORD=<your_gmail_app_password><br>
   d. JWT_KEY=<your_jwt_secret_key><br>

4. Start the application:
   npm start

5. Access the application in your browser at http://localhost:5000


## Usage
- Sign up with a valid email address to create an account.
- Verify your email address by following the instructions in the verification email sent to you.
- Log in to your account using your credentials.
- Explore the user-friendly interface to manage your bookmarks.
- Add bookmarks as needed.
