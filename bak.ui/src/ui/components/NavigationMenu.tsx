import { HamburgerIcon } from '@chakra-ui/icons';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Avatar,
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
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { logout } from '../../services/Authentication';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const NavigationMenu = () => {
    const userContext = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    return (
        <Box p={2}>
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
                {userContext.loggedIn ? (
                    <>
                        <Link to={'/profile'}>
                            <Text>{`Hello, ${userContext.name}`}</Text>
                        </Link>
                        <Link to={'/profile'}>
                            <Text>
                                <Avatar
                                    name="Dan Abrahmov"
                                    src="https://bit.ly/dan-abramov"
                                    size="sm"
                                />
                            </Text>
                        </Link>
                    </>
                ) : null}
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
                                <MenuItem onClick={onOpen}>
                                    <>
                                        Logout
                                        <AlertDialog
                                            isOpen={isOpen}
                                            leastDestructiveRef={cancelRef}
                                            onClose={onClose}
                                        >
                                            <AlertDialogOverlay>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader
                                                        fontSize="lg"
                                                        fontWeight="bold"
                                                    >
                                                        Logout
                                                    </AlertDialogHeader>

                                                        <AlertDialogBody>
                                                            Are you sure you
                                                            want to logout?
                                                        </AlertDialogBody>

                                                        <AlertDialogFooter>
                                                            <Button
                                                                ref={cancelRef}
                                                                onClick={
                                                                    onClose
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                colorScheme="red"
                                                                onClick={() => {
                                                                    logout();
                                                                    window.location.assign(
                                                                        '/'
                                                                    );
                                                                    onClose;
                                                                }}
                                                                ml={3}
                                                            >
                                                                Logout
                                                            </Button>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialogOverlay>
                                            </AlertDialog>
                                        </>
                                    </MenuItem>
                                </>
                            ) : null}
                        </MenuList>
                    </Menu>
                </HStack>
            </Box>
        </Box>
    );
};
