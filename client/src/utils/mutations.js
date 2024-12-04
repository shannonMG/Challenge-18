"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_BOOK = exports.SAVE_BOOK = exports.ADD_USER = exports.LOGIN_USER = void 0;
const client_1 = require("@apollo/client");
exports.LOGIN_USER = (0, client_1.gql) `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      email
      username
    }
  }
}`;
exports.ADD_USER = (0, client_1.gql) `
mutation AddUser($input: UserInput!){
  AddUser(input: $input){
    token
  }
}`;
exports.SAVE_BOOK = (0, client_1.gql) `
mutation SaveBook($input: SaveBookInput!) {
  saveBook(input: $input) {
    _id
    username
    email
    bookCount
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}`;
exports.REMOVE_BOOK = (0, client_1.gql) `
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
    bookCount
  }
}`;
