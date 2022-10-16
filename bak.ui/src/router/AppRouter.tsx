import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { LoginPage } from '../ui/pages/authentication/LoginPage';
import { RegisterPage } from '../ui/pages/authentication/RegisterPage';
import { UserDetailsPage } from '../ui/pages/details/UserDetailsPage';
import { NotFound } from '../ui/pages/errorpages/NotFound';
import { Unauthorized } from '../ui/pages/errorpages/Unauthorized';
import { OrganizationsPage } from '../ui/pages/information/OrganizationsPage';
import { ProfilePage } from '../ui/pages/information/ProfilePage';
import { UsersPage } from '../ui/pages/information/UsersPage';
import { UserApp } from '../ui/UserApp';

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<UserApp />} />
            <Route
                path="login"
                element={<DisabledAfterLoginRoute element={<LoginPage />} />}
            />
            <Route
                path="register"
                element={<DisabledAfterLoginRoute element={<RegisterPage />} />}
            />
            <Route
                path="profile"
                element={<ProtectedRoute element={<ProfilePage />} />}
            />
            {/* Users paths */}
            <Route
                path="/users"
                element={<ProtectedRoute element={<UsersPage />} />}
            />
            <Route
                path="/users/:userId"
                element={<ProtectedRoute element={<UserDetailsPage />} />}
            />
            <Route
                path="/users/create"
                element={<ProtectedRoute element={<UserDetailsPage />} />}
            />
            {/* Organization paths */}
            <Route
                path="/organizations"
                element={<ProtectedRoute element={<OrganizationsPage />} />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

function ProtectedRoute({ element }: { element: JSX.Element }) {
    const { loggedIn } = useContext(UserContext);
    return loggedIn === true ? element : <Unauthorized />;
}

function DisabledAfterLoginRoute({ element }: { element: JSX.Element }) {
    const { loggedIn } = useContext(UserContext);
    return loggedIn !== true ? element : <NotFound />;
}
