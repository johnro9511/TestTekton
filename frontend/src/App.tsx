import React from "react";
import CreateLeave from "./pages/CreateLeave";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CreateLeave />
      <Dashboard />
    </div>
  );
}
