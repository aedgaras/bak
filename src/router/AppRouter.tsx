import { Route, Routes } from 'react-router-dom';
import {
    DisabledAfterLoginRoute,
    PageNotFound,
    ProtectedRoute,
    RoleRoute,
} from '../components';
import {
    AnimalCreatePage,
    AnimalDetailsPage,
    AnimalsPage,
} from '../features/animal';
import { LoginPage, RegisterPage } from '../features/authentication';
import { CaseCreatePage, CaseDetailsPage, CasePage } from '../features/case';
import {
    DiagnosesDetailsPage,
    DiagnosesPage,
    DiagnosisCreatePage,
} from '../features/diagnosis';
import {
    CreateHealthRecordPage,
    HealthRecordDetailsPage,
    HealthRecordsPage,
} from '../features/healthRecord';
import { HomePageEntry } from '../features/homepage';
import { RecipeCreate, RecipeList } from '../features/recipe';
import { RecipeDetails } from '../features/recipe/views/RecipeDetails';
import { ResultCreate, ResultDetails, ResultList } from '../features/result';
import {
    UserCreate,
    UserDetails,
    UserList,
    UserProfile,
} from '../features/user';
import { useUserContext } from '../providers/UserProvider';
import {
    animalsRoutePath,
    authRoutePath,
    casesRoutePath,
    diagnosesRoutePath,
    healthRecordsRoutePath,
    profileRoutePath,
    recipesRoutePath,
    resultsRoutePath,
    usersRoutePath,
} from './paths';

export const AppRouter = () => {
    const { state } = useUserContext();

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
                        <HomePageEntry />
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
            <Route
                path={profileRoutePath}
                element={
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                }
            />
            {/* Users paths */}
            <Route path={usersRoutePath}>
                <Route
                    path={usersRoutePath}
                    element={
                        <ProtectedRoute>
                            <UserList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={usersRoutePath + '/:userId'}
                    element={
                        <ProtectedRoute>
                            <UserDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={usersRoutePath + '/create'}
                    element={
                        <ProtectedRoute>
                            <RoleRoute authorizedRoles={['Admin']}>
                                <UserCreate />
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
                <Route
                    path={healthRecordsRoutePath + '/:id'}
                    element={<HealthRecordDetailsPage />}
                />
                <Route
                    path={healthRecordsRoutePath + '/rate/:healthRecordId'}
                    element={<CaseCreatePage />}
                />
            </Route>
            <Route path={casesRoutePath}>
                <Route path={casesRoutePath} element={<CasePage />} />
                <Route
                    path={casesRoutePath + '/create'}
                    element={<CaseCreatePage />}
                />
                <Route
                    path={casesRoutePath + '/:id'}
                    element={<CaseDetailsPage />}
                />
                <Route
                    path={casesRoutePath + '/createDiagnosis/:caseId'}
                    element={<DiagnosisCreatePage />}
                />
            </Route>
            <Route path={animalsRoutePath}>
                <Route path={animalsRoutePath} element={<AnimalsPage />} />
                <Route
                    path={animalsRoutePath + '/:id'}
                    element={<AnimalDetailsPage />}
                />
                <Route
                    path={animalsRoutePath + '/create'}
                    element={<AnimalCreatePage />}
                />
                <Route
                    path={animalsRoutePath + '/createHealthRecord/:animalId'}
                    element={<CreateHealthRecordPage />}
                />
            </Route>
            <Route path={diagnosesRoutePath}>
                <Route path={diagnosesRoutePath} element={<DiagnosesPage />} />
                <Route
                    path={diagnosesRoutePath + '/create'}
                    element={<DiagnosisCreatePage />}
                />
                <Route
                    path={diagnosesRoutePath + '/createResult/:diagnosisId'}
                    element={<ResultCreate />}
                />
                <Route
                    path={diagnosesRoutePath + '/:id'}
                    element={<DiagnosesDetailsPage />}
                />
            </Route>
            <Route path={resultsRoutePath}>
                <Route path={resultsRoutePath} element={<ResultList />} />

                <Route
                    path={resultsRoutePath + '/createRecipe/:resultId'}
                    element={<RecipeCreate />}
                />
                <Route
                    path={resultsRoutePath + '/:id'}
                    element={<ResultDetails />}
                />
            </Route>
            <Route path={recipesRoutePath}>
                <Route path={recipesRoutePath} element={<RecipeList />} />
                {state.role === 'Admin' ||
                state.classification === 'Veterinarian' ? (
                    <Route
                        path={recipesRoutePath + '/create'}
                        element={<RecipeCreate />}
                    />
                ) : null}

                <Route
                    path={recipesRoutePath + '/:id'}
                    element={<RecipeDetails />}
                />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};
