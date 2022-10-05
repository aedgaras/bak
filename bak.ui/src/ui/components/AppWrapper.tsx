import { Box } from '@chakra-ui/layout';
import React from 'react';
import { NavigationMenu } from './NavigationMenu';

export type ChildrenProps = {
    children:
        | JSX.Element
        | string
        | React.ReactFragment
        | React.ReactNode
        | any;
};

export const AppWrapper = ({ children }: ChildrenProps): JSX.Element => {
    return (
        <Box padding={2}>
            <NavigationMenu />
            <Box paddingTop={2}>{children}</Box>
        </Box>
    );
};
