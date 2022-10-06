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
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const NavigationMenu = () => {
    return (
        <Box
            padding={2}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
        >
            <HStack>
                <Link to={'/'}>
                    <Button>Home</Button>
                </Link>
                <Link to={'/users'}>
                    <Button>Users</Button>
                </Link>
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
                        <Link to={'/login'}>
                            <MenuItem>Login</MenuItem>
                        </Link>
                        <Link to={'/register'}>
                            <MenuItem>Register</MenuItem>
                        </Link>
                        <Link to={'/profile'}>
                            <MenuItem>Profile</MenuItem>
                        </Link>
                        <MenuDivider />
                        <Link to={'/logout'}>
                            <MenuItem>Logout</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </HStack>
        </Box>
    );
};
