import jwtDecode from 'jwt-decode';
import React, { useMemo } from 'react';
import { AuthService } from '../services';
import { ACCESS_TOKEN_NAME } from '../utils/constants';
import { Classification, Role } from '../utils/Models';

interface UserContextInterface {
    name?: string;
    loggedIn?: boolean;
    role?: Role;
    classification?: Classification;
    userId?: number;
}

//export const UserContext = createContext<UserContextInterface>({});

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

    useMemo(() => {
        update(userContextValues());
    }, []);

    return <Provider>{children}</Provider>;
};

const UserContext = ctx;

interface User {
    sub: string;
    role: Role;
    classifaction: Classification;
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
              classification: currentUser.classifaction,
              userId: currentUser.userId,
          }
        : {};
}

export const useUserContext = () => {
    return React.useContext(UserContext);
};
