import {
    Avatar,
    Button,
    Link as ChakraLink,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useUserContext } from '../../providers/UserProvider';
import { profileRoutePath } from '../../router';
import { MenuDropdown } from './MenuDropdown';

export const RightSideMenu = () => {
    const { state } = useUserContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t, i18n } = useTranslation();
    const cancelRef = useRef(null);
    return (
        <>
            {state.loggedIn === true ? (
                <>
                    <ChakraLink
                        as={RouterLink}
                        to={profileRoutePath}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text>{t('Navigation.Greetings')}</Text>
                        <Text>{`${state.name}`}</Text>
                    </ChakraLink>
                    <Avatar name={state?.name} src={''} size={'sm'} />
                </>
            ) : null}
            <LanguageSwitcher />
            <MenuDropdown
                isOpen={isOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                onOpen={onOpen}
            />
        </>
    );
};

export function LanguageSwitcher() {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.language === 'en'
            ? i18n.changeLanguage('lt')
            : i18n.changeLanguage('en');

        localStorage.setItem('languageMode', i18n.language);
    };

    return (
        <Button
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={toggleLanguage}
            aria-label={`${t('Navigation.SwitchLanguage')}`}
        >
            {i18n.language === 'en' ? 'LT' : 'EN'}
        </Button>
    );
}
