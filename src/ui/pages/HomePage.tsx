import { useUserContext } from '../../context/UserContext';
import { AdminHomePage } from './homepage/AdminHomePage';
import { UserHomePage } from './homepage/UserHomePage';

export const HomePage = () => {
    const { state } = useUserContext();

    return state.role === 'User' && state.classification === 'Customer' ? (
        <UserHomePage />
    ) : (
        <AdminHomePage />
    );
};
