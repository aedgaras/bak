import { Box, useColorModeValue } from '@chakra-ui/react';
import { ChildrenProps } from './AppWrapper';

export const BoxWithShadow = ({ children }: ChildrenProps): JSX.Element => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            padding={2}
        >
            {children}
        </Box>
    );
};

export const BoxWithShadowMax = ({ children }: ChildrenProps): JSX.Element => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            padding={2}
            w={'100%'}
            h={'100%'}
        >
            {children}
        </Box>
    );
};
