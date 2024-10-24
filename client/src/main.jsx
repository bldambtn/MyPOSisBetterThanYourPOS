import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Enterprise from "./pages/Enterprise";
import InventoryDashboard from "./pages/InventoryDashboard.jsx";
import PointOfSale from "./pages/PointOfSale.jsx";
import SalesReports from "./pages/SalesReports.jsx"; 
import NotificationsPage from "./pages/NotificationsPage";

// Set up routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/enterprise", element: <Enterprise /> },
      { path: "/enterprise/pos", element: <PointOfSale /> },
      { path: "enterprise/inventory", element: <InventoryDashboard /> },
      { path: "/enterprise/reports", element: <SalesReports /> },
      { path: "/enterprise/notifications", element: <NotificationsPage /> },
    ],
  },
]);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("ServiceWorker registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("ServiceWorker registration failed: ", registrationError);
      });
  });
}
