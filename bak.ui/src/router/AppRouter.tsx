import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { LoginPage } from '../ui/pages/authentication/LoginPage';
import { RegisterPage } from '../ui/pages/authentication/RegisterPage';
import { NotFound, Unauthorized } from '../ui/pages/information/NotFound';
import { ProfilePage } from '../ui/pages/information/ProfilePage';
import { UserDetailsPage } from '../ui/pages/information/UserDetailsPage';
import { UsersPage } from '../ui/pages/information/UsersPage';
import { UserApp } from '../ui/UserApp';

export const AppRouter = () => {
    const userContext = useContext(UserContext);

    return (
        <Routes>
            <Route index element={<UserApp />} />
            <Route
                path="login"
                element={
                    userContext.loggedIn !== true ? <LoginPage /> : <NotFound />
                }
            />
            <Route
                path="register"
                element={
                    userContext.loggedIn !== true ? (
                        <RegisterPage />
                    ) : (
                        <NotFound />
                    )
                }
            />
            <Route
                path="profile"
                element={
                    userContext.loggedIn === true ? (
                        <ProfilePage />
                    ) : (
                        <Unauthorized />
                    )
                }
            />
            <Route
                path="/users"
                element={
                    userContext.loggedIn === true ? (
                        <UsersPage />
                    ) : (
                        <Unauthorized />
                    )
                }
            />
            <Route
                path="/users/:userId"
                element={
                    userContext.loggedIn === true ? (
                        <UserDetailsPage />
                    ) : (
                        <Unauthorized />
                    )
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
