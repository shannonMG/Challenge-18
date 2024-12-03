import './App.css';
import { Outlet } from 'react-router-dom';
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import Navbar from './components/Navbar';
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: '/graphql', // Replace with your GraphQL server URI
});

// Set up the auth middleware to attach the token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // Adjust this to where you store the token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});




const client = new ApolloClient({
  uri:'/graphql',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})



function App() {
  return (
    <ApolloProvider client = {client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
