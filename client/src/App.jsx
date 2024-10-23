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
import Auth from "./utils/auth";

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
      deferredPrompt.userChoice.then((choiceResult) => {
        setDeferredPrompt(null);
      });
    }
  };

  const shouldShowChat = () => {
    const isHomePage = location.pathname === "/";
    const isEnterprisePage = location.pathname.startsWith("/enterprise");
    const isLoggedIn = Auth.loggedIn();
    return (
      !isHomePage && (!isEnterprisePage || (isEnterprisePage && isLoggedIn))
    );
  };

  return (
    <ApolloProvider client={client}>
      <TitleBanner />
      <StoreProvider>
        <Outlet /> {/* Renders nested routes */}
        {deferredPrompt && (
          <button onClick={handleInstallClick}>Install App</button>
        )}
        {shouldShowChat() && <ChatWindow />}{" "}
        {/* Chat window displayed on every page */}
        <Notifications /> {/* Notifications section */}
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
