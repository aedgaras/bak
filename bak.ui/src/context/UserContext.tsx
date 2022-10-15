import { createContext } from 'react';
import { getCurrentUser } from '../services/Authentication';

export interface UserContextInterface {
    name?: string;
    loggedIn?: boolean;
    role?: 'admin' | 'user';
}

export const UserContext = createContext<UserContextInterface>({});

export function userContextValues(): UserContextInterface {
    return {
        name: getCurrentUser()?.username,
        loggedIn: getCurrentUser() !== null,
    };
}
