import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../ui/authentication/LoginPage';
import { RegisterPage } from '../ui/authentication/RegisterPage';
import { UserApp } from '../ui/UserApp';

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
