import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch'; 

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NoMatch />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);