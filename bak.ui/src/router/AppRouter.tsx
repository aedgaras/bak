import { Route, Routes } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { LoginPage } from '../ui/pages/authentication/LoginPage';
import { RegisterPage } from '../ui/pages/authentication/RegisterPage';
import { OrganizationDetailsPage } from '../ui/pages/details/OrganizationDetailsPage';
import { UserDetailsPage } from '../ui/pages/details/UserDetailsPage';
import { PageNotFound, Unauthorized } from '../ui/pages/errorpages';
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
            <Route
                path="/organizations/:orgName"
                element={
                    <ProtectedRoute element={<OrganizationDetailsPage />} />
                }
            />
            <Route
                path="/organizations/create"
                element={
                    <ProtectedRoute element={<OrganizationDetailsPage />} />
                }
            />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

function ProtectedRoute({ element }: { element: JSX.Element }) {
    const { loggedIn } = useUserContext();
    return loggedIn === true ? element : <Unauthorized />;
}

function DisabledAfterLoginRoute({ element }: { element: JSX.Element }) {
    const { loggedIn } = useUserContext();
    return loggedIn !== true ? element : <PageNotFound />;
}
