import { HamburgerIcon } from '@chakra-ui/icons';
import {
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
import { UserContext } from '../../../context/UserContext';
import { MenuDropdownProps } from '../../../utils/Models/InterfaceModels';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { LogoutDialog } from '../dialogs/LogoutDialog';
import {
    IsLoggedInElement,
    IsNotLoggedInElement,
} from '../wrappers/HelperWrappers';

export const NavigationMenu = () => {
    const userContext = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    return (
        <Box>
            <Box p={2}>
                <Box
                    padding={2}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow={{
                        base: 'none',
                        sm: useColorModeValue('md', 'md-dark'),
                    }}
                >
                    <HStack>
                        <IsLoggedInElement
                            element={
                                <>
                                    <Link to={'/'}>
                                        <Button>Home</Button>
                                    </Link>
                                    <Link to={'/users'}>
                                        <Button>Users</Button>
                                    </Link>
                                </>
                            }
                        />
                        <Spacer />
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
                    </HStack>
                </Box>
            </Box>
        </Box>
    );
};

const MenuDropdown = ({
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
                            <Link to={'/login'}>
                                <MenuItem>Login</MenuItem>
                            </Link>
                            <Link to={'/register'}>
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
