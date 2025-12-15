# Authentication API (Node.js + Express + MongoDB)

A backend authentication system implementing:
- User signup & login
- Password hashing using bcrypt
- Request validation using Joi
- MongoDB (Mongoose)
- Proper HTTP status codes & error handling

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- Joi

## NPM packages to install (CLI Commands)
- npm init -y
- npm i express
- npm i mongoose
- npm i nodemon
- npm i joi
- npm i bcrypt
- npm i cors
- npm i body-parser
  
## Features
- Prevents duplicate user signup
- Secure password storage
- Input validation middleware
- RESTful API design

## Endpoints
POST /auth/signup  
POST /auth/login  

## Learning Outcomes
- Express middleware flow
- One-response-per-request pattern
- Handling async errors
- MongoDB query handling
