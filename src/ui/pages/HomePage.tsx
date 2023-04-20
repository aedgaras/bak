import { isUser } from '../../context/UserContext';
import { AdminHomePage } from './homepage/AdminHomePage';
import { UserHomePage } from './homepage/UserHomePage';

export const HomePage = () => {
    return isUser() ? <UserHomePage /> : <AdminHomePage />;
};
