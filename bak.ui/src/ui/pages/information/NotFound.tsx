import { Center, Heading } from '@chakra-ui/react';
import { AppWrapper } from '../../components/AppWrapper';

export const NotFound = () => (
    <AppWrapper>
        <Center>
            <Heading>Page not found</Heading>
        </Center>
    </AppWrapper>
);

export const Unauthorized = () => (
    <AppWrapper>
        <Center>
            <Heading>Unauthorized</Heading>
        </Center>
    </AppWrapper>
);
