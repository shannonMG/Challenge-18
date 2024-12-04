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
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const node_url_1 = require("node:url");
const connection_js_1 = __importDefault(require("./config/connection.js"));
const server_1 = require("@apollo/server"); // Note: Import from @apollo/server-express
const express4_1 = require("@apollo/server/express4");
const index_js_1 = require("./schemas/index.js");
const auth_js_1 = require("./utils/auth.js");
const __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
const __dirname = node_path_1.default.dirname(__filename);
const server = new server_1.ApolloServer({
    typeDefs: // this creates an ApolloServer using the typeDefs and resolvers 
    index_js_1.typeDefs,
    resolvers: index_js_1.resolvers
});
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start(); //starts server so it is ready for requests
    yield (0, connection_js_1.default)(); //runs db function that initializes database connection in ./config/connection.ts
    const PORT = process.env.PORT || 3001;
    const app = (0, express_1.default)(); //creates the express app to handle HTTP requests 
    app.use(express_1.default.urlencoded({ extended: false })); //parses incoming url data
    app.use(express_1.default.json()); //parses incoming json data
    app.use('/graphql', (0, express4_1.expressMiddleware)(server, //adds graphq1 endpoint to the server - allows for server to handle graphql requests, links express route /graphql to the server (in this case an Apollo server)
    {
        context: auth_js_1.authenticateToken // context is from apollo server and it allows us to pass data or perform operations on every request, in this carse the autheticateToken function in my ./utils/auth.ts
    }));
    if (process.env.NODE_ENV === 'production') { //serves files from client/dist folder if enironment is in production
        app.use(express_1.default.static(node_path_1.default.join(__dirname, '../client/dist')));
        app.get('*', (_req, res) => {
            res.sendFile(node_path_1.default.join(__dirname, '../../client/dist/index.html'));
        });
    }
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
});
startApolloServer();
