import { useUserContext } from '../../providers/UserProvider';
import { AdminHomePage } from './AdminHomePage';
import { UserHomePage } from './UserHomePage';

export const HomePageEntry = () => {
    const { state } = useUserContext();

    return state.role === 'User' && state.classification === 'Customer' ? (
        <UserHomePage />
    ) : (
        <AdminHomePage />
    );
};
