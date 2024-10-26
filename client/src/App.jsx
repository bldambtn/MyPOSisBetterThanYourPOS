import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/GlobalState";

import TitleBanner from "./components/TitleBanner";
import ChatWindow from "./components/ChatWindow"; // Chat Window component
import Notifications from "./components/Notifications"; // Notifications component
import Footer from "./components/Footer"; // Import Footer component
import Auth from "./utils/auth";
import "./index.css";

// Apollo Client setup
const httpLink = createHttpLink({
  uri: "/graphql",
});

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

  // PWA installation logic
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
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
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  // Logic to determine when to show the chat window and notifications
  const shouldShowChat = () => {
    const isHomePage = location.pathname === "/";
    const isEnterprisePage = location.pathname.startsWith("/enterprise");
    const isLoggedIn = Auth.loggedIn();
    return (
      !isHomePage && (!isEnterprisePage || (isEnterprisePage && isLoggedIn))
    );
  };

  const shouldShowNotifications = () => {
    const isLoggedIn = Auth.loggedIn();
    return isLoggedIn;
  };

  return (
    <ApolloProvider client={client}>
      <TitleBanner />
      <StoreProvider>
        <div className="app-container">
          <main>
            <Outlet /> {/* Renders nested routes */}
          </main>
          {shouldShowChat() && <ChatWindow />}
          {shouldShowNotifications() && <Notifications />}
          {/* Pass deferredPrompt and handleInstallClick to Footer */}
          <Footer
            deferredPrompt={deferredPrompt}
            handleInstallClick={handleInstallClick}
          />
        </div>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
