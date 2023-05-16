import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
                <Box>
                    <IsNotLoggedInElement
                        element={
                            <>
                                <Link to={'auth/login'}>
                                    <MenuItem>
                                        {t('Authentication.Login')}
                                    </MenuItem>
                                </Link>
                                <Link to={'auth/register'}>
                                    <MenuItem>
                                        {t('Authentication.Register')}
                                    </MenuItem>
                                </Link>
                            </>
                        }
                    />
                    <IsLoggedInElement
                        element={
                            <>
                                <MenuItem onClick={onOpen}>
                                    <>
                                        {t('MenuDropdown.Logout')}
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
                </Box>
            </MenuList>
        </Menu>
    );
};
