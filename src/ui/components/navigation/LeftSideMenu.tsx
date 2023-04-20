import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { isUser } from '../../../context/UserContext';
import {
    animalsRoutePath,
    casesRoutePath,
    diagnosesResultsRoutePath,
    diagnosesRoutePath,
    healthRecordsRoutePath,
    recipesRoutePath,
    usersRoutePath,
} from '../../../router/AppRouter';
import { IsLoggedInElement } from '../wrappers/HelperWrappers';

export const LeftSideMenu = () => {
    const { t } = useTranslation();

    return (
        <IsLoggedInElement
            element={
                <>
                    <Link to={'/'}>
                        <Button>{t('Navigation.Home')}</Button>
                    </Link>
                    {!isUser() ? (
                        <Link to={usersRoutePath}>
                            <Button>{t('Navigation.Users')}</Button>
                        </Link>
                    ) : null}
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
                                    <MenuItem>{t('Navigation.Cases')}</MenuItem>
                                </Link>
                                <Link to={diagnosesRoutePath}>
                                    <MenuItem>
                                        {t('Navigation.Diagnoses')}
                                    </MenuItem>
                                </Link>
                                <Link to={diagnosesResultsRoutePath}>
                                    <MenuItem>
                                        {t('Navigation.Results')}
                                    </MenuItem>
                                </Link>
                                <Link to={recipesRoutePath}>
                                    <MenuItem>
                                        {t('Navigation.Recipes')}
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                    ) : null}
                </>
            }
        />
    );
};
