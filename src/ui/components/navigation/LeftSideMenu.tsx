import {Button} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {IsLoggedInElement} from '../wrappers/HelperWrappers';

export const LeftSideMenu = () => {
    const {t} = useTranslation();

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
                    <Link to={'/organizations'}>
                        <Button>{t('Navigation.Organizations')}</Button>
                    </Link>
                </>
            }
        />
    );
};
