import { Center, Heading } from '@chakra-ui/react';

export const NotFound = () => {
    document.title = 'Page not found';

    return (
        <Center>
            <Heading>Page not found</Heading>
        </Center>
    );
};
