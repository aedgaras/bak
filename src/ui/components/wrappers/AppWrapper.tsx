import { Box } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import React from 'react';

export type ChildrenProps = {
    children:
        | JSX.Element
        | string
        | React.ReactFragment
        | React.ReactNode
        | undefined
        | any;
};

export const AppWrapper = ({ children }: any): JSX.Element => {
    return (
        <Box paddingLeft={2} paddingRight={2} paddingBottom={2}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Box>{children}</Box>
            </motion.div>
        </Box>
    );
};
