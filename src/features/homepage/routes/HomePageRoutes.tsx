import { Route } from 'react-router-dom';
import { DisabledAfterLoginRoute } from '../../../components';
import { useUserContext } from '../../../providers/UserProvider';
import { LoginPage } from '../../authentication';
import { HomePageEntry } from '../views/HomePageEntry';

export const HomePageRoutes = () => {
    const { state } = useUserContext();

    return (
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
    );
};
