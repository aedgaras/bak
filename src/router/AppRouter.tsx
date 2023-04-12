import { Route, Routes } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { PageNotFound, Unauthorized } from '../ui/components/errors';
import { LoginPage } from '../ui/pages/authentication/LoginPage';
import { RegisterPage } from '../ui/pages/authentication/RegisterPage';
import { UserCreatePage } from '../ui/pages/create/UserCreatePage';
import { ProfilePage } from '../ui/pages/details/ProfilePage';
import { UserDetailsPage } from '../ui/pages/details/UserDetailsPage';
import { HomePage } from '../ui/pages/HomePage';
import { AnimalsPage } from '../ui/pages/lists/AnimalsPage';
import { DiagnoseResultsPage } from '../ui/pages/lists/DiagnoseResults';
import { DiagnosesPage } from '../ui/pages/lists/DiagnosesPage';
import { HealthRecordsPage } from '../ui/pages/lists/HealthRecordsPage';
import { RecipesPage } from '../ui/pages/lists/RecipesPage';
import { UsersPage } from '../ui/pages/lists/UsersPage';
import { Role } from '../utils/Models';

export const authRoutePath = '/auth';
export const usersRoutePath = '/users';
export const healthRecordsRoutePath = '/healthrecords';
export const animalsRoutePath = '/animals';
export const diagnosesRoutePath = '/diagnoses';
export const diagnosesResultsRoutePath = '/diagnosesResults';
export const recipesRoutePath = '/recipes';

export const AppRouter = () => {
    const { state } = useUserContext();
    console.log(state.loggedIn);

    return (
        <Routes>
            <Route
                index
                element={
                    state.loggedIn === false || state.loggedIn === undefined ? (
                        <DisabledAfterLoginRoute>
                            <LoginPage />
                        </DisabledAfterLoginRoute>
                    ) : (
                        <HomePage />
                    )
                }
            />
            <Route path={authRoutePath}>
                <Route
                    path={authRoutePath + '/login'}
                    element={
                        <DisabledAfterLoginRoute>
                            <LoginPage />
                        </DisabledAfterLoginRoute>
                    }
                />
                <Route
                    path={authRoutePath + '/register'}
                    element={
                        <DisabledAfterLoginRoute>
                            <RegisterPage />
                        </DisabledAfterLoginRoute>
                    }
                />
            </Route>
            <></>
            <Route
                path="profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            {/* Users paths */}
            <Route path={usersRoutePath}>
                <Route
                    path={usersRoutePath}
                    element={
                        <ProtectedRoute>
                            <UsersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={usersRoutePath + '/:userId'}
                    element={
                        <ProtectedRoute>
                            <UserDetailsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={usersRoutePath + '/create'}
                    element={
                        <ProtectedRoute>
                            <RoleRoute authorizedRoles={['Admin']}>
                                <UserCreatePage />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />
            </Route>
            {/* Health Records */}
            <Route path={healthRecordsRoutePath}>
                <Route
                    path={healthRecordsRoutePath}
                    element={<HealthRecordsPage />}
                />
            </Route>
            <Route path={animalsRoutePath}>
                <Route path={animalsRoutePath} element={<AnimalsPage />} />
            </Route>
            <Route path={diagnosesRoutePath}>
                <Route path={diagnosesRoutePath} element={<DiagnosesPage />} />
            </Route>
            <Route path={diagnosesResultsRoutePath}>
                <Route
                    path={diagnosesResultsRoutePath}
                    element={<DiagnoseResultsPage />}
                />
            </Route>
            <Route path={recipesRoutePath}>
                <Route path={recipesRoutePath} element={<RecipesPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

function ProtectedRoute({ children }: any) {
    const { state } = useUserContext();
    return state.loggedIn === true ? children : <Unauthorized />;
}

function DisabledAfterLoginRoute({ children }: any) {
    const { state } = useUserContext();
    return state.loggedIn !== true ? children : <PageNotFound />;
}

function RoleRoute({
    children,
    authorizedRoles,
}: {
    children: any;
    authorizedRoles: Role[];
}) {
    const { state } = useUserContext();

    return authorizedRoles.includes(state.role!) ? children : <Unauthorized />;
}
