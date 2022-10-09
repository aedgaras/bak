import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    useColorModeValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { logout } from '../../services/Authentication';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const NavigationMenu = () => {
    const userContext = useContext(UserContext);

    return (
        <Box
            padding={2}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
        >
            <HStack>
                {userContext.loggedIn ? (
                    <>
                        <Link to={'/'}>
                            <Button>Home</Button>
                        </Link>
                        <Link to={'/users'}>
                            <Button>Users</Button>
                        </Link>
                    </>
                ) : null}
                <Spacer />
                <ColorModeSwitcher />
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
                        {!userContext.loggedIn ? (
                            <>
                                <Link to={'/login'}>
                                    <MenuItem>Login</MenuItem>
                                </Link>
                                <Link to={'/register'}>
                                    <MenuItem>Register</MenuItem>
                                </Link>
                            </>
                        ) : null}
                        {userContext.loggedIn ? (
                            <>
                                <Link to={'/profile'}>
                                    <MenuItem>Profile</MenuItem>
                                </Link>
                                <MenuDivider />
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                        window.location.assign('/');
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </>
                        ) : null}
                    </MenuList>
                </Menu>
            </HStack>
        </Box>
    );
};
