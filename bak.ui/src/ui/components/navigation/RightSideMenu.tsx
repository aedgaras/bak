import { Avatar, Text, useDisclosure } from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { IsLoggedInElement } from '../wrappers/HelperWrappers';
import { MenuDropdown } from './MenuDropdown';

export const RightSideMenu = () => {
    const userContext = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    return (
        <>
            {' '}
            <IsLoggedInElement
                element={
                    <>
                        <Link to={'/profile'}>
                            <Text>{`Hello, ${userContext.name}`}</Text>
                        </Link>
                        <Link to={'/profile'}>
                            <Text>
                                <Avatar
                                    name={userContext.name}
                                    src={''}
                                    size="sm"
                                />
                            </Text>
                        </Link>
                    </>
                }
            />
            <ColorModeSwitcher />
            <MenuDropdown
                isOpen={isOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                onOpen={onOpen}
            />
        </>
    );
};
