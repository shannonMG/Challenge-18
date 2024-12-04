"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = require("react-bootstrap");
const auth_1 = __importDefault(require("../utils/auth"));
const localStorage_1 = require("../utils/localStorage");
const client_1 = require("@apollo/client");
const queries_js_1 = require("../utils/queries.js");
const mutations_js_1 = require("../utils/mutations.js");
const SavedBooks = () => {
    const { loading, data, error } = (0, client_1.useQuery)(queries_js_1.GET_ME);
    const [removeBook] = (0, client_1.useMutation)(mutations_js_1.REMOVE_BOOK);
    if (loading) {
        return <h2>LOADING</h2>;
    }
    if (error) {
        console.error(error);
        return <h2>Error Loading User Data</h2>;
    }
    const userData = (data === null || data === void 0 ? void 0 : data.me) || {
        username: '',
        email: '',
        password: '',
        savedBooks: [],
    };
    const handleDeleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
        const token = auth_1.default.loggedIn() ? auth_1.default.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = yield removeBook({
                variables: { bookId },
            });
            if (!data) {
                throw new Error('something went wrong');
            }
            (0, localStorage_1.removeBookId)(bookId);
        }
        catch (err) {
            console.error(err);
        }
    });
    return (<>
      <div className='text-light bg-dark p-5'>
        <react_bootstrap_1.Container>
          {userData.username ? (<h1>Viewing {userData.username}'s saved books!</h1>) : (<h1>Viewing saved books!</h1>)}
        </react_bootstrap_1.Container>
      </div>
      <react_bootstrap_1.Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <react_bootstrap_1.Row>
          {userData.savedBooks.map((book) => {
            return (<react_bootstrap_1.Col md='4'>
                <react_bootstrap_1.Card key={book.bookId} border='dark'>
                  {book.image ? (<react_bootstrap_1.Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top'/>) : null}
                  <react_bootstrap_1.Card.Body>
                    <react_bootstrap_1.Card.Title>{book.title}</react_bootstrap_1.Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <react_bootstrap_1.Card.Text>{book.description}</react_bootstrap_1.Card.Text>
                    <react_bootstrap_1.Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </react_bootstrap_1.Button>
                  </react_bootstrap_1.Card.Body>
                </react_bootstrap_1.Card>
              </react_bootstrap_1.Col>);
        })}
        </react_bootstrap_1.Row>
      </react_bootstrap_1.Container>
    </>);
};
exports.default = SavedBooks;
