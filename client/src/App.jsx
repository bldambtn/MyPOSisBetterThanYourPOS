import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react"; // Import useEffect and useState
// import Enterprise from './pages/Enterprise';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,

} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from "./utils/GlobalState";

import TitleBanner from './components/TitleBanner';
// import Home from './pages/Home'; 
// import InventoryDashboard from './pages/InventoryDashboard';
// import Signup from './pages/Signup'; 
// import NoMatch from './pages/NoMatch';


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
        
      {/* <Router> */}
        <StoreProvider>
          {/* <Routes>
            <Route path="/enterprise" element={<Enterprise />} /> 
            <Route path="/inventory" element={<InventoryDashboard />} /> 
            <Route path="/signup" element={<Signup />} /> 
            <Route path="*" element={<NoMatch />} /> 
          </Routes> */}
         <Outlet />
        {/* Add your install button somewhere in your app */}
        {deferredPrompt && (
          <button onClick={handleInstallClick}>Install App</button>
        )}
        </StoreProvider>
      {/* </Router> */}
    </ApolloProvider>
  );
}

export default App;
