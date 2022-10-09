import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { AppWrapper } from './components/AppWrapper';
import { BoxWithShadow } from './components/BoxWithShadow';

export const UserApp = () => {
    const userContext = useContext(UserContext);
    console.log(userContext);
    return (
        <AppWrapper>
            <BoxWithShadow>userApp</BoxWithShadow>
        </AppWrapper>
    );
};
