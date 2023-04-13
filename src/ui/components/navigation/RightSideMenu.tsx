import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../../context/UserContext';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { MenuDropdown } from './MenuDropdown';

export const RightSideMenu = () => {
    const { state } = useUserContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    return (
        <>
            <Text>{`Hello, ${state.name}`}</Text>
            <LanguageSwitcher />
            <ColorModeSwitcher />
            <MenuDropdown
                isOpen={isOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                onOpen={onOpen}
            />
        </>
    );
};

function LanguageSwitcher() {
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
