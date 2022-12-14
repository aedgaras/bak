import { HamburgerIcon } from '@chakra-ui/icons';
import {
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LogoutDialog } from '../dialogs';
import { MenuDropdownProps } from '../interfaces';
import {
    IsLoggedInElement,
    IsNotLoggedInElement,
} from '../wrappers/HelperWrappers';

export const MenuDropdown = ({
    onClose,
    onOpen,
    isOpen,
    cancelRef,
}: MenuDropdownProps) => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
            />
            <MenuList
                boxShadow={{
                    base: 'none',
                    sm: useColorModeValue('md', 'md-dark'),
                }}
            >
                <IsNotLoggedInElement
                    element={
                        <>
                            <Link to={'auth/login'}>
                                <MenuItem>Login</MenuItem>
                            </Link>
                            <Link to={'auth/register'}>
                                <MenuItem>Register</MenuItem>
                            </Link>
                        </>
                    }
                />
                <IsLoggedInElement
                    element={
                        <>
                            <Link to={'/profile'}>
                                <MenuItem>Profile</MenuItem>
                            </Link>
                            <MenuDivider />
                            <MenuItem onClick={onOpen}>
                                <>
                                    Logout
                                    <LogoutDialog
                                        isOpen={isOpen}
                                        cancelRef={cancelRef}
                                        onClose={onClose}
                                    />
                                </>
                            </MenuItem>
                        </>
                    }
                />
            </MenuList>
        </Menu>
    );
};
