import { Outlet, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
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

//Required for chat window, socket.io
import ChatWindow from './components/ChatWindow';
import Auth from './utils/auth';

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
  const location = useLocation();

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

  // Required for socket.io to work
  const shouldShowChat = () => {
    const isHomePage = location.pathname === "/";
    const isEnterprisePage = location.pathname.startsWith("/enterprise");
    const isLoggedIn = Auth.loggedIn();

    // Show chat only on non-home pages and on the enterprise page when logged in
    return (
      !isHomePage && (!isEnterprisePage || (isEnterprisePage && isLoggedIn))
    );
  };

 return (
    <ApolloProvider client={client}>
      <TitleBanner />
      <StoreProvider>
        <Outlet /> {/* Render the nested routes */}
        {deferredPrompt && (
          <button onClick={handleInstallClick}>Install App</button>
        )}
        {/* Optional: Remove or comment out the ChatWindow if it's not needed */}
         {shouldShowChat() && <ChatWindow />}
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
