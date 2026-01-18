import React, {useRef} from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import CreateLeave from "./pages/CreateLeave";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

function AppContent() {
  const { user } = useAuth();
  const dashboardRef = useRef<{ reload: () => void }>(null);

  /* VALIDATE IF EXIST USER */
  if (!user) return <Login />;

  return (
    <>
    <Layout>
      {user.role === "Employee" && <CreateLeave onCreated={() => dashboardRef.current?.reload()} />}
      <Dashboard ref={dashboardRef} />
    </Layout>
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
