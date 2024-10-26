import React from "react";
import "../index.css"; // Make sure to import your CSS file for styling

function Footer({ handleInstallClick, deferredPrompt }) {
  return (
    <footer className="site-footer">
      <p>© 2024 SuperiorSupply.io. All rights reserved.</p>
      {/* Install Button aligned to the right */}
      {deferredPrompt && (
        <button className="footer-install-button" onClick={handleInstallClick}>
          Install App
        </button>
      )}
    </footer>
  );
}

export default Footer;
