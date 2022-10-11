import { Box } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
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
            <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}>
            <Box paddingTop={2}>{children}</Box>
            </motion.div>
        </Box>
    );
};
