import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
                    <Link to={'/users'}>
                        <Button>{t('Navigation.Users')}</Button>
                    </Link>
                    <Link to={'/healthrecords'}>
                        <Button>{t('Navigation.HealthRecords')}</Button>
                    </Link>
                    <Link to={'/animals'}>
                        <Button>{t('Navigation.Animals')}</Button>
                    </Link>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {t('Navigation.Cases')}
                        </MenuButton>
                        <MenuList>
                            <Link to={'/diagnoses'}>
                                <MenuItem>{t('Navigation.Diagnoses')}</MenuItem>
                            </Link>
                            <Link to={'/results'}>
                                <MenuItem>{t('Navigation.Results')}</MenuItem>
                            </Link>
                            <Link to={'/recipes'}>
                                <MenuItem>{t('Navigation.Recipes')}</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </>
            }
        />
    );
};
