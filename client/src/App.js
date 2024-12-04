"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const client_1 = require("@apollo/client");
const Navbar_1 = __importDefault(require("./components/Navbar"));
const context_1 = require("@apollo/client/link/context");
const httpLink = (0, client_1.createHttpLink)({
    uri: '/graphql', // Replace with your GraphQL server URI
});
// Set up the auth middleware to attach the token
const authLink = (0, context_1.setContext)((_, { headers }) => {
    const token = localStorage.getItem('token'); // Adjust this to where you store the token
    return {
        headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token}` : '' }),
    };
});
const client = new client_1.ApolloClient({
    uri: '/graphql',
    cache: new client_1.InMemoryCache(),
    link: authLink.concat(httpLink)
});
function App() {
    return (<client_1.ApolloProvider client={client}>
      <Navbar_1.default />
      <react_router_dom_1.Outlet />
    </client_1.ApolloProvider>);
}
exports.default = App;
