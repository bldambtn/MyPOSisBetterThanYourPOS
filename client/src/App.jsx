import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { StoreProvider } from './utils/GlobalState';
import Home from './pages/Home'; // Import the home page
import InventoryDashboard from './pages/InventoryDashboard'; // Import the new Inventory Dashboard page
import Signup from './pages/Signup'; // Example of another page
import NoMatch from './pages/NoMatch'; // Example of a 404 page

const httpLink = createHttpLink({
  uri: '/graphql',
});

// This checks if we have a JWT stored in local storage, 
// If so, it is included in the authorization header for all future GraphQL requests.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home Page */}
            <Route path="/inventory" element={<InventoryDashboard />} /> {/* Inventory Dashboard */}
            <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
            <Route path="*" element={<NoMatch />} /> {/* 404 Page */}
          </Routes>
          <Outlet />
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
