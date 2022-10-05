import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../ui/pages/authentication/LoginPage';
import { RegisterPage } from '../ui/pages/authentication/RegisterPage';
import { NotFound } from '../ui/pages/information/NotFound';
import { UserApp } from '../ui/UserApp';

export const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <Routes>
            <Route path="/" element={<UserApp />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
