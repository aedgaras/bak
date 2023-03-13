import {Spacer} from '@chakra-ui/react';
import {useEffect} from 'react';
import {refreshToken} from '../../../services/Authentication';
import {isJwtExpired} from '../../../utils/utils';
import {NavBar} from '../wrappers/NavBar';
import {LeftSideMenu} from './LeftSideMenu';
import {RightSideMenu} from './RightSideMenu';

export const NavigationMenu = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            const jwtExpired = isJwtExpired();
            if (jwtExpired !== undefined && jwtExpired === true) {
                refreshToken();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <NavBar
            element={
                <>
                    <LeftSideMenu/>
                    <Spacer/>
                    <RightSideMenu/>
                </>
            }
        />
    );
};
