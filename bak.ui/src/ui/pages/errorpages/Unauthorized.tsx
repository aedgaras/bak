import { Center, Heading } from '@chakra-ui/react';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

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
