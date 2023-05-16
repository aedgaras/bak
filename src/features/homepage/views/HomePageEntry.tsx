import React from 'react';
import { useUserContext } from '../../../providers/UserProvider';
import { AdminHomePage } from './AdminHomePage';
import { UserHomePage } from './UserHomePage';

export const HomePageEntry: React.FC = () => {
    const { state } = useUserContext();

    return state.role === 'User' && state.classification === 'Customer' ? (
        <UserHomePage />
    ) : (
        <AdminHomePage />
    );
};
