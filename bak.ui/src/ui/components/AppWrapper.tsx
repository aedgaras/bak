import { Box } from '@chakra-ui/layout';
import { Spacer, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { NavigationMenu } from './NavigationMenu';

type Props = {
    children:
        | JSX.Element
        | string
        | React.ReactFragment
        | React.ReactNode
        | any;
};

export const AppWrapper = ({ children }: Props): JSX.Element => {
    return (
        <Box padding={2}>
            <NavigationMenu />
            <Box
                padding={2}
            >
                {children}
            </Box>
        </Box>
    );
};
