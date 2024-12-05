# Challenge 18 - README

## Introduction
The Book Search Engine is a web application that allows users to search for books using the Google Books API. Users can create an account, save their favorite books to their profile, and manage their saved book list. The application is built with a GraphQL API on the back end and Apollo Client on the front end.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologiesused)
- [License](#license)

## Installation
- Clone the repository:
git clone https://github.com/yourusername/book-search-engine.git
- Install dependencies for both client and server.
- Start the application:
npm run start

## Usage
- Click on the "Login/Signup" menu option.
- Use the modal to either log in or sign up by providing the necessary credentials.
Save Books:
- While logged in, search for books and click the "Save This Book!" button under any book to save it to your account.
View Saved Books:
- Click on the "Saved Books" menu option to view all books saved to your account.
- Remove books by clicking the "Remove" button under each saved book.
- Logout:
Click the "Logout" button in the menu to log out of your account.

## Features
- User Authentication: Secure login and signup functionality with token-based authentication.
- Book Search: Search for books using the Google Books API.
- Save Books: Logged-in users can save books to their profile.
- View & Manage Saved Books: Users can view and remove books from their saved list.
- GraphQL API: Efficient data fetching with GraphQL queries and mutations.

## Technologies Used
- Front End:
  React
  Apollo Client
  JWT for authentication
- Back End:
  Node.js
  Express.js
  Apollo Server (GraphQL)
  MongoDB & Mongoose
  JSON Web Tokens (JWT)
## License
This project is licensed under the MIT License.

## Acknowledgements
Thanks to the instructors and staff for providing the initial project setup and guidance.
The application uses the Google Books API for fetching book data.
