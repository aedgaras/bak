import { Box, VStack } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

export const BoxWithShadow: React.FC<PropsWithChildren> = (props) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={'md'}
            padding={2}
            background={'white'}
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
            boxShadow={'md'}
            padding={2}
            w={'100%'}
            h={'100%'}
            background={'white'}
        >
            {props.children}
        </Box>
    );
};

export const BoxWithBorder: React.FC<PropsWithChildren> = (props) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            padding={2}
            background={'white'}
        >
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
            background={'white'}
        >
            {props.children}
        </Box>
    );
};

export const FormWrapper: React.FC<PropsWithChildren> = (props) => {
    return (
        <BoxWithShadow>
            <VStack p={2}>
                <BoxWithShadow>
                    <Box p={6}>{props.children}</Box>
                </BoxWithShadow>
            </VStack>
        </BoxWithShadow>
    );
};
