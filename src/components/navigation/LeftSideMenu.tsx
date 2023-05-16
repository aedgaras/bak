import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
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
import { IsLoggedInElement } from '../wrappers/HelperWrappers';

export const LeftSideMenu = () => {
    const { t } = useTranslation();
    const { state } = useUserContext();

    return (
        <IsLoggedInElement
            element={
                <>
                    <Link to={'/'}>
                        <Button>{t('Navigation.Home')}</Button>
                    </Link>
                    {state.role === 'Admin' ? (
                        <Link to={usersRoutePath}>
                            <Button>{t('Navigation.Users')}</Button>
                        </Link>
                    ) : (
                        <>
                            <Link to={healthRecordsRoutePath}>
                                <Button>{t('Navigation.HealthRecords')}</Button>
                            </Link>
                            <Link to={animalsRoutePath}>
                                <Button>{t('Navigation.Animals')}</Button>
                            </Link>
                            {!isUser() ? (
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={<ChevronDownIcon />}
                                    >
                                        {t('Navigation.Cases')}
                                    </MenuButton>
                                    <MenuList>
                                        <Link to={casesRoutePath}>
                                            <MenuItem>
                                                {t('Navigation.Cases')}
                                            </MenuItem>
                                        </Link>
                                        {state.classification ===
                                        'Veterinarian' ? (
                                            <>
                                                <Link to={diagnosesRoutePath}>
                                                    <MenuItem>
                                                        {t(
                                                            'Navigation.Diagnoses'
                                                        )}
                                                    </MenuItem>
                                                </Link>
                                                <Link to={resultsRoutePath}>
                                                    <MenuItem>
                                                        {t(
                                                            'Navigation.Results'
                                                        )}
                                                    </MenuItem>
                                                </Link>

                                                <Link to={recipesRoutePath}>
                                                    <MenuItem>
                                                        {t(
                                                            'Navigation.Recipes'
                                                        )}
                                                    </MenuItem>
                                                </Link>
                                            </>
                                        ) : null}
                                    </MenuList>
                                </Menu>
                            ) : null}
                        </>
                    )}
                </>
            }
        />
    );
};
