import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    IconButton,
    Image,
    Spacer,
    Text,
    VStack,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { isUser, useUserContext } from '../../providers/UserProvider';
import {
    animalsRoutePath,
    casesRoutePath,
    diagnosesRoutePath,
    healthRecordsRoutePath,
    recipesRoutePath,
    resultsRoutePath,
    usersRoutePath,
} from '../../router';
import { LogoutDialog } from '../dialogs';
import { LanguageSwitcher, LeftSideMenu, RightSideMenu } from '../navigation';
import { BoxWithShadow } from './BoxWithShadow';
import { IsLoggedInElement, IsNotLoggedInElement } from './HelperWrappers';

export const NavBar = ({ children }: any) => {
    const { state } = useUserContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const [display, changeDisplay] = useState('none');

    return (
        <Box p={2}>
            <Box
                padding={2}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow={{
                    base: 'none',
                    sm: useColorModeValue('md', 'md-dark'),
                }}
                background={'white'}
            >
                <Flex>
                    <Flex width={'100%'}>
                        {/* Desktop */}
                        <HStack
                            display={['none', 'none', 'none', 'flex']}
                            width={'100%'}
                            px="2"
                        >
                            <Box pr={6}>
                                <Image
                                    boxSize={'50px'}
                                    src="https://cdn3d.iconscout.com/3d/premium/thumb/pet-medicine-6379719-5272758.png?f=avif"
                                ></Image>
                            </Box>

                            <LeftSideMenu />
                            <Spacer />
                            <RightSideMenu />
                        </HStack>
                        <Spacer />
                        <HStack display={['flex', 'flex', 'flex', 'none']}>
                            {state.loggedIn === true ? (
                                <>
                                    <Text>{t('Navigation.Greetings')}</Text>
                                    <Text>{`${state.name}`}</Text>
                                    <Avatar
                                        name={state?.name}
                                        src={''}
                                        size={'sm'}
                                    />
                                </>
                            ) : null}
                            <LanguageSwitcher />
                            <IconButton
                                aria-label="Options"
                                icon={<HamburgerIcon />}
                                variant="outline"
                                onClick={() => changeDisplay('flex')}
                            />
                        </HStack>
                    </Flex>

                    {/* Mobile Content */}
                    <Flex
                        w="100vw"
                        display={display}
                        sx={{
                            backgroundImage:
                                'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)',
                            filter: 'alpha(opacity=50)',
                        }}
                        zIndex={20}
                        h="100vh"
                        pos="fixed"
                        top="0"
                        left="0"
                        overflowY="auto"
                        flexDir="column"
                        p="2"
                        gap="2"
                    >
                        <BoxWithShadow>
                            <HStack justify="flex-end">
                                {state.loggedIn === true ? (
                                    <>
                                        <Text>{t('Navigation.Greetings')}</Text>
                                        <Text>{`${state.name}`}</Text>
                                        <Avatar
                                            name={state?.name}
                                            src={''}
                                            size={'sm'}
                                        />
                                    </>
                                ) : null}
                                <LanguageSwitcher />
                                <IconButton
                                    aria-label="Open Menu"
                                    icon={<CloseIcon />}
                                    onClick={() => changeDisplay('none')}
                                />
                            </HStack>
                        </BoxWithShadow>

                        <BoxWithShadow>
                            <VStack>
                                <IsNotLoggedInElement
                                    element={
                                        <>
                                            <Link to={'auth/login'}>
                                                <Button
                                                    onClick={() =>
                                                        changeDisplay('none')
                                                    }
                                                >
                                                    {t('Authentication.Login')}
                                                </Button>
                                            </Link>
                                            <Divider />
                                            <Link to={'auth/register'}>
                                                <Button
                                                    onClick={() =>
                                                        changeDisplay('none')
                                                    }
                                                >
                                                    {t(
                                                        'Authentication.Register'
                                                    )}
                                                </Button>
                                            </Link>
                                        </>
                                    }
                                />
                                <IsLoggedInElement
                                    element={
                                        <>
                                            <Link to={'/'}>
                                                <Button
                                                    onClick={() =>
                                                        changeDisplay('none')
                                                    }
                                                >
                                                    {t('Navigation.Home')}
                                                </Button>
                                            </Link>
                                            <Divider />
                                            {state.role === 'Admin' ? (
                                                <>
                                                    <Link to={usersRoutePath}>
                                                        <Button
                                                            onClick={() =>
                                                                changeDisplay(
                                                                    'none'
                                                                )
                                                            }
                                                        >
                                                            {t(
                                                                'Navigation.Users'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                    <Divider />
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        to={
                                                            healthRecordsRoutePath
                                                        }
                                                    >
                                                        <Button
                                                            onClick={() =>
                                                                changeDisplay(
                                                                    'none'
                                                                )
                                                            }
                                                        >
                                                            {t(
                                                                'Navigation.HealthRecords'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                    <Divider />
                                                    <Link to={animalsRoutePath}>
                                                        <Button
                                                            onClick={() =>
                                                                changeDisplay(
                                                                    'none'
                                                                )
                                                            }
                                                        >
                                                            {t(
                                                                'Navigation.Animals'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                    {!isUser() ? (
                                                        <>
                                                            <Divider />
                                                            <Link
                                                                to={
                                                                    casesRoutePath
                                                                }
                                                            >
                                                                <Button
                                                                    onClick={() =>
                                                                        changeDisplay(
                                                                            'none'
                                                                        )
                                                                    }
                                                                >
                                                                    {t(
                                                                        'Navigation.Cases'
                                                                    )}
                                                                </Button>
                                                            </Link>
                                                            {state.classification ===
                                                            'Veterinarian' ? (
                                                                <>
                                                                    <Divider />
                                                                    <Link
                                                                        to={
                                                                            diagnosesRoutePath
                                                                        }
                                                                    >
                                                                        <Button
                                                                            onClick={() =>
                                                                                changeDisplay(
                                                                                    'none'
                                                                                )
                                                                            }
                                                                        >
                                                                            {t(
                                                                                'Navigation.Diagnoses'
                                                                            )}
                                                                        </Button>
                                                                    </Link>
                                                                    <Divider />
                                                                    <Link
                                                                        to={
                                                                            resultsRoutePath
                                                                        }
                                                                    >
                                                                        <Button
                                                                            onClick={() =>
                                                                                changeDisplay(
                                                                                    'none'
                                                                                )
                                                                            }
                                                                        >
                                                                            {t(
                                                                                'Navigation.Results'
                                                                            )}
                                                                        </Button>
                                                                    </Link>
                                                                    <Divider />
                                                                    <Link
                                                                        to={
                                                                            recipesRoutePath
                                                                        }
                                                                    >
                                                                        <Button
                                                                            onClick={() =>
                                                                                changeDisplay(
                                                                                    'none'
                                                                                )
                                                                            }
                                                                        >
                                                                            {t(
                                                                                'Navigation.Recipes'
                                                                            )}
                                                                        </Button>
                                                                    </Link>
                                                                </>
                                                            ) : null}
                                                        </>
                                                    ) : null}
                                                </>
                                            )}
                                            <Button onClick={onOpen}>
                                                <>
                                                    {t('MenuDropdown.Logout')}
                                                    <LogoutDialog
                                                        isOpen={isOpen}
                                                        cancelRef={cancelRef}
                                                        onClose={onClose}
                                                    />
                                                </>
                                            </Button>
                                        </>
                                    }
                                />
                            </VStack>
                        </BoxWithShadow>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};
