import { useEffect, useState, React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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

  return (
    <div className="homepage">
      <div className="page-content">
        {" "}
        {/* Apply the background image here */}
        <div className="container">
          <div className="welcome-container">
            <h1 className="welcome-text">Welcome to Superior Supply.io</h1>
            <p className="welcome-text">
              Your one-stop solution for inventory and sales management.
            </p>
          </div>

          <div className="button-container">
            <Link to="/enterprise">
              <button className="enterprise-button">Enterprise</button>
            </Link>

            <button className="marketplace-button" disabled>
              Marketplace (coming soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
