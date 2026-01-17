import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import CreateLeave from "./pages/CreateLeave";
import Dashboard from "./pages/Dashboard";

function AppContent() {
  const { user } = useAuth();
  if (!user) return <Login />;

  return (
    <>
      {user.role === "Employee" && <CreateLeave />}
      <Dashboard />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

/*
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CreateLeave />
      <Dashboard />
    </div>
  );
}
*/
