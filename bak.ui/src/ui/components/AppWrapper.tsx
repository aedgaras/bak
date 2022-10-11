import { Box } from '@chakra-ui/layout';
import React from 'react';

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
            <Box paddingTop={2}>{children}</Box>
        </Box>
    );
};
