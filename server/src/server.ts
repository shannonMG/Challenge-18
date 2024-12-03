import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server';// Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = new ApolloServer({ // this creates an ApolloServer using the typeDefs and resolvers 
  typeDefs,
  resolvers
});

const startApolloServer = async () => {  
  await server.start(); //starts server so it is ready for requests
  await db(); //runs db function that initializes database connection in ./config/connection.ts

  const PORT = process.env.PORT || 3001;
  const app = express(); //creates the express app to handle HTTP requests 

  app.use(express.urlencoded({ extended: false })); //parses incoming url data
  app.use(express.json()); //parses incoming json data

  app.use('/graphql', expressMiddleware(server as any,  //adds graphq1 endpoint to the server - allows for server to handle graphql requests, links express route /graphql to the server (in this case an Apollo server)
    {
      context: authenticateToken as any // context is from apollo server and it allows us to pass data or perform operations on every request, in this carse the autheticateToken function in my ./utils/auth.ts
    }
  ));

  // if (process.env.NODE_ENV === 'production') {                //serves files from client/dist folder if enironment is in production
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
    
  // }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
