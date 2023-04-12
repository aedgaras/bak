import { Box, useColorModeValue } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export const BoxWithShadow: React.FC<PropsWithChildren> = (props) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            padding={2}
        >
            {props.children}
        </Box>
    );
};

export const BoxWithShadowMax: React.FC<PropsWithChildren> = (props) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            padding={2}
            w={'100%'}
            h={'100%'}
        >
            {props.children}
        </Box>
    );
};

export const BoxWithBorder: React.FC<PropsWithChildren> = (props) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" padding={2}>
            {props.children}
        </Box>
    );
};

export const BoxWithBorderMax: React.FC<PropsWithChildren> = (props) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            padding={2}
            w={'100%'}
            h={'100%'}
        >
            {props.children}
        </Box>
    );
};
