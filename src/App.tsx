import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import DashboardPage from "./features/dashboard/components/DashboardPage";
import SettingsPage from "@/features/dashboard/pages/DashboardSettings";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Nested routes for dashboard modules */}
          <Route index element={<DashboardPage />} />{" "}
          {/* /dashboard (default child route) */}
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Redirect from root to dashboard or login */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Fallback for any unmatched routes */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
