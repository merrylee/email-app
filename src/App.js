import React, { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { UserContext } from "./contexts/UserContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import "./App.css";

function App() {
  const { user } = useContext(UserContext);

  return (
    <NotificationProvider>
        {user ? <MainPage /> : <LoginPage />}
    </NotificationProvider>
  );
}

export default App;
