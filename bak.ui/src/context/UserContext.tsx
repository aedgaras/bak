import React, { createContext } from 'react';
import { getCurrentUser } from '../services/Authentication';
import { Role } from '../utils/Models/Models';

interface UserContextInterface {
    name?: string;
    loggedIn?: boolean;
    role?: Role;
}

export const UserContext = createContext<UserContextInterface>({});

export function userContextValues(): UserContextInterface {
    const currentUser = getCurrentUser();

    return currentUser
        ? {
              name: currentUser.username,
              loggedIn: currentUser !== null,
              role: currentUser.role,
          }
        : {};
}

export const useUserContext = () => {
    return React.useContext(UserContext);
};
