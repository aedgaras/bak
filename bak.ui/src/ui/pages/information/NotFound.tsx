import { Center, Heading } from '@chakra-ui/react';
import { AppWrapper } from '../../components/AppWrapper';

export const NotFound = () => {
    document.title = 'Page not found';

    return (
        <AppWrapper>
            <Center>
                <Heading>Page not found</Heading>
            </Center>
        </AppWrapper>
    );
};

export const Unauthorized = () => {
    document.title = 'Unauthorized';

    return (
        <AppWrapper>
            <Center>
                <Heading>Unauthorized</Heading>
            </Center>
        </AppWrapper>
    );
};
