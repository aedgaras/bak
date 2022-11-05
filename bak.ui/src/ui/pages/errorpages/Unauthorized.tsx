import { Center, Heading } from '@chakra-ui/react';

export const Unauthorized = () => {
    document.title = 'Unauthorized';

    return (
        <Center>
            <Heading>Unauthorized</Heading>
        </Center>
    );
};
