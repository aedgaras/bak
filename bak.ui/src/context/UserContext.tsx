import React, { useMemo } from 'react';
import { getCurrentUser } from '../services/Authentication';
import { Role } from '../utils/Models/Models';

interface UserContextInterface {
    name?: string;
    loggedIn?: boolean;
    role?: Role;
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
