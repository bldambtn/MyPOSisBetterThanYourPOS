import { useEffect, useState, React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../index.css"; // Import the CSS file for custom styling

const Home = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent the default prompt from appearing automatically
      setDeferredPrompt(event); // Save the event for triggering later
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
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the prompt after the user makes a choice
      });
    }
  };

  return (
    <div className="homepage">
      {" "}
      {/* Apply the 'homepage' class for unique styling */}
      <div className="container">
        <h1>Welcome to Superior Supply.io</h1>
        <p>Your one-stop solution for inventory and sales management.</p>

        <div className="button-container">
          {/* Enterprise Button */}
          <Link to="/enterprise">
            <button className="enterprise-button">Enterprise</button>
          </Link>

          {/* Marketplace Button */}
          <button className="marketplace-button" disabled>
            Marketplace (coming soon)
          </button>
        </div>

        {/* Install button: Only shown if the deferred prompt is available */}
        {deferredPrompt && (
          <button
            id="install-button"
            onClick={handleInstallClick}
            style={{
              display: "block",
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Install App
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
