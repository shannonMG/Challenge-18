"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ME = void 0;
const client_1 = require("@apollo/client");
exports.GET_ME = (0, client_1.gql) `
  query Query {
  me {
    _id
    bookCount
    email
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
