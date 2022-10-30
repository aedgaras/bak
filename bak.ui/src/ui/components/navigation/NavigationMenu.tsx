import { Spacer, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { logout } from '../../../services/Authentication';
import { isJwtExpired, timeDifference } from '../../../utils/utils';
import { NavBar } from '../wrappers/NavBar';
import { LeftSideMenu } from './LeftSideMenu';
import { RightSideMenu } from './RightSideMenu';

export const NavigationMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const interval = setInterval(() => {
            const jwtExpired = isJwtExpired();
            const timeDiff = timeDifference();
            if (jwtExpired !== undefined && jwtExpired === true) {
                logout();
            }
        }, 1000);
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
