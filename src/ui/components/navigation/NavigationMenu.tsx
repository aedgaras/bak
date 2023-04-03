import { Spacer } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
    userContextValues,
    useUserContext,
} from '../../../context/UserContext';
import { refreshToken } from '../../../services/Authentication';
import { isJwtExpired } from '../../../utils/utils';
import { NavBar } from '../wrappers/NavBar';
import { LeftSideMenu } from './LeftSideMenu';
import { RightSideMenu } from './RightSideMenu';

export const NavigationMenu = () => {
    const ctx = useUserContext();
    useEffect(() => {
        const interval = setInterval(() => {
            const jwtExpired = isJwtExpired();
            if (jwtExpired === true) {
                refreshToken();
                ctx.update(userContextValues);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <NavBar>
            <LeftSideMenu />
            <Spacer />
            <RightSideMenu />
        </NavBar>
    );
};
