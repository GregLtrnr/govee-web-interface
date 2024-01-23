import React, { useState } from "react";
import "./index.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./pages/homepage-new";
import Dashboard from "./pages/dashboard";
import { ConfigProvider, theme } from "antd";
import { NotificationProvider } from "./contexts/NotificationContext";

export default function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(document.cookie.includes("darkmode=true"));

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
    console.log(`Dark mode is now ${!isDarkMode ? "enabled" : "disabled"}`);
    document.cookie = `darkmode=${!isDarkMode};path=/;max-age=31536000`;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorBgContainer: isDarkMode ? "#172A46" : "#FFFFFF",
          colorBgLayout: isDarkMode ? "#0A192F" : "#F5F5F5",
        },
      }}
    >
      <NotificationProvider>
        <React.StrictMode>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
              <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            </Routes>
          </Router>
        </React.StrictMode>
      </NotificationProvider>
    </ConfigProvider>
  );
}
