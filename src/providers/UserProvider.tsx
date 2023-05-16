import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { AuthService } from '../services';
import { Classification, Role } from '../utils/Models';
import { ACCESS_TOKEN_NAME } from '../utils/constants';
import { isJwtExpired } from '../utils/utils';

interface UserContextInterface {
    name?: string;
    loggedIn?: boolean;
    role?: Role;
    classification?: Classification;
    userId?: number;
}

export function createCtx<A>(defaultValue: A) {
    type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
    const defaultUpdate: UpdateType = () => defaultValue;

    const ctx = React.createContext({
        state: defaultValue,
        update: defaultUpdate,
    });

    function Provider(props: React.PropsWithChildren<{}>) {
        const [state, update] = React.useState(defaultValue);
        return <ctx.Provider value={{ state, update }} {...props} />;
    }

    return [ctx, Provider] as const;
}

export const [ctx, Provider] = createCtx<UserContextInterface>(
    userContextValues()
);

export const UserContextProvider = ({ children }: any): JSX.Element => {
    const { update, state } = useUserContext();

    useEffect(() => {
        if (isJwtExpired()) {
            const api = new AuthService();
            api.refreshToken();
        }
        update(userContextValues());
    }, []);

    return <Provider>{children}</Provider>;
};

const UserContext = ctx;

interface User {
    sub: string;
    role: Role;
    classification: Classification;
    userId: number;
}

export function getCurrentUser(): User | null {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
    const refreshToken = localStorage.getItem(ACCESS_TOKEN_NAME);

    if (!accessToken || !refreshToken) {
        return null;
    }

    const decodedAccessToken = jwtDecode<{ iat: number; exp: number }>(
        accessToken
    );
    const decodedRefreshToken = jwtDecode<{ iat: number; exp: number }>(
        refreshToken
    );

    if (decodedAccessToken.iat > decodedAccessToken.exp) {
        const authService = new AuthService();
        authService.logout();
        return null;
    }

    const decodedUserJwt = jwtDecode<User>(accessToken);

    return decodedUserJwt;
}

export function userContextValues(): UserContextInterface {
    const currentUser = getCurrentUser();

    return currentUser
        ? {
              name: currentUser.sub,
              loggedIn: currentUser !== null,
              role: currentUser.role,
              classification: currentUser.classification,
              userId: currentUser.userId,
          }
        : {};
}

export const useUserContext = () => {
    return React.useContext(UserContext);
};

export const isUser = () => {
    const { state } = useUserContext();
    return state.classification === 'Customer' && state.role === 'User';
};
