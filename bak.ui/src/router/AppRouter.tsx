import { Route, Router, Routes } from "react-router-dom";
import { UserApp } from "../ui/UserApp";
import { LoginPage } from "../ui/authentication/LoginPage";
import { RegisterPage } from "../ui/authentication/RegisterPage";
import { useState } from "react";

export const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<UserApp />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
};
