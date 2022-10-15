import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { ElementChildren } from '../../../utils/Models/InterfaceModels';

export const IsLoggedInElement = ({ element }: ElementChildren) => {
    const userContext = useContext(UserContext);
    return userContext.loggedIn ? element : null;
};

export const IsNotLoggedInElement = ({ element }: ElementChildren) => {
    const userContext = useContext(UserContext);
    return !userContext.loggedIn ? element : null;
};
