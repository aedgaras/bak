import { Center, Heading } from '@chakra-ui/react';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

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
