import { Center, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const UserApp = () => {
    const { t, i18n } = useTranslation();
    document.title = 'Blossom HR';
    return (
        <Center height={'100vh'}>
            <Heading lineHeight="tall">{t('Greetings.Hello')}</Heading>
        </Center>
    );
};
