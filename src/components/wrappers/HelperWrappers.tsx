import { useUserContext } from '../../providers/UserProvider';
import { ElementChildren } from '../interfaces';

export const IsLoggedInElement = ({ element }: ElementChildren) => {
    const { state } = useUserContext();
    return state.loggedIn ? element : null;
};

export const IsNotLoggedInElement = ({ element }: ElementChildren) => {
    const { state } = useUserContext();
    return !state.loggedIn ? element : null;
};
