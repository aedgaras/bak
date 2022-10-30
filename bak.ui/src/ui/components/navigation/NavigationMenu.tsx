import { Spacer } from '@chakra-ui/react';
import { useEffect } from 'react';
import { logout } from '../../../services/Authentication';
import { isJwtExpired } from '../../../utils/utils';
import { NavBar } from '../wrappers/NavBar';
import { LeftSideMenu } from './LeftSideMenu';
import { RightSideMenu } from './RightSideMenu';

export const NavigationMenu = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            if (isJwtExpired() !== undefined && isJwtExpired() === true) {
                logout();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <NavBar
            element={
                <>
                    <LeftSideMenu />
                    <Spacer />
                    <RightSideMenu />
                </>
            }
        />
    );
};
