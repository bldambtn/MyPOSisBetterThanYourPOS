import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react"; // Import useEffect and useState

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,

} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from "./utils/GlobalState";

import TitleBanner from './components/TitleBanner';
import Home from './pages/Home'; // Import the home page
import InventoryDashboard from './pages/InventoryDashboard'; // Import the new Inventory Dashboard page
import Signup from './pages/Signup'; // Example of another page
import NoMatch from './pages/NoMatch'; // Example of a 404 page


const httpLink = createHttpLink({
  uri: "/graphql",
});

// This checks if we have a JWT stored in local storage, 

// If so, it is included in the authorization header for all future GraphQL requests.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent automatic display of the prompt
      setDeferredPrompt(event); // Save the event for later use
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the installation prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the deferred prompt after the choice
      });
    }
  };

  return (
    <ApolloProvider client={client}>
        <TitleBanner />
        
      <Router>
        <StoreProvider>
          <Routes>
            <Route path="/enterprise" element={<Enterprise />} /> {/* Home Page */}
            <Route path="/inventory" element={<InventoryDashboard />} /> {/* Inventory Dashboard */}
            <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
            <Route path="*" element={<NoMatch />} /> {/* 404 Page */}
          </Routes>
         <Outlet />
        {/* Add your install button somewhere in your app */}
        {deferredPrompt && (
          <button onClick={handleInstallClick}>Install App</button>
        )}
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
