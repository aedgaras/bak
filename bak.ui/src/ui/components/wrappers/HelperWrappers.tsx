import { useUserContext } from '../../../context/UserContext';
import { ElementChildren } from '../interfaces';

export const IsLoggedInElement = ({ element }: ElementChildren) => {
    const userContext = useUserContext();
    return userContext.loggedIn ? element : null;
};

export const IsNotLoggedInElement = ({ element }: ElementChildren) => {
    const userContext = useUserContext();
    return !userContext.loggedIn ? element : null;
};
