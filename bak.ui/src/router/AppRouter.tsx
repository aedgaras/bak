import { Route, Routes } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { PageNotFound, Unauthorized } from '../ui/components/errors';
import { LoginPage } from '../ui/pages/authentication/LoginPage';
import { RegisterPage } from '../ui/pages/authentication/RegisterPage';
import { OrganizationDetailsPage } from '../ui/pages/details/OrganizationDetailsPage';
import { ProfilePage } from '../ui/pages/details/ProfilePage';
import { UserDetailsPage } from '../ui/pages/details/UserDetailsPage';
import { OrganizationsPage } from '../ui/pages/lists/OrganizationsPage';
import { UsersPage } from '../ui/pages/lists/UsersPage';
import { UserApp } from '../ui/UserApp';

const authPath = '/auth';
const usersPath = '/users';
const organizationsPath = '/organizations';

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<UserApp />} />
            <Route path={authPath}>
                <Route
                    path={authPath + '/login'}
                    element={
                        <DisabledAfterLoginRoute element={<LoginPage />} />
                    }
                />
                <Route
                    path={authPath + '/register'}
                    element={
                        <DisabledAfterLoginRoute element={<RegisterPage />} />
                    }
                />
            </Route>
            <Route
                path="profile"
                element={<ProtectedRoute element={<ProfilePage />} />}
            />
            {/* Users paths */}
            <Route path={usersPath}>
                <Route
                    path={usersPath}
                    element={<ProtectedRoute element={<UsersPage />} />}
                />
                <Route
                    path={usersPath + '/:userId'}
                    element={<ProtectedRoute element={<UserDetailsPage />} />}
                />
                <Route
                    path={usersPath + '/create'}
                    element={<ProtectedRoute element={<UserDetailsPage />} />}
                />
            </Route>

            {/* Organization paths */}
            <Route path={organizationsPath}>
                <Route
                    path={organizationsPath}
                    element={<ProtectedRoute element={<OrganizationsPage />} />}
                />
                <Route
                    path={organizationsPath + '/:orgId'}
                    element={
                        <ProtectedRoute element={<OrganizationDetailsPage />} />
                    }
                />
                <Route
                    path={organizationsPath + '/create'}
                    element={
                        <ProtectedRoute element={<OrganizationDetailsPage />} />
                    }
                />
            </Route>

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

function ProtectedRoute({ element }: { element: JSX.Element }) {
    const { state } = useUserContext();
    return state.loggedIn === true ? element : <Unauthorized />;
}

function DisabledAfterLoginRoute({ element }: { element: JSX.Element }) {
    const { state } = useUserContext();
    return state.loggedIn !== true ? element : <PageNotFound />;
}
