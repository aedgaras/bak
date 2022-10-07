import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useState,
} from 'react';

export interface UserContext {
    loggedIn: boolean;
    username?: string;
}

export function createCtx<A>(defaultValue: A) {
    type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
    const defaultUpdate: UpdateType = () => defaultValue;
    const ctx = createContext({
        state: defaultValue,
        update: defaultUpdate,
    });

    function Provider(props: PropsWithChildren<{}>) {
        const [state, update] = useState(defaultValue);
        return <ctx.Provider value={{ state, update }} {...props} />;
    }
    return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
}

const [userContext, UserContextProvider] = createCtx<UserContext>({
    loggedIn: false,
});
export const UserContext = userContext;
