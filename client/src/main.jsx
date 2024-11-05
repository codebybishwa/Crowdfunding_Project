import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext"; // Import the context provider
import "./index.css"; // Global CSS
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider> {/* Wrap the App with AuthContextProvider */}
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>
);
