import { Box } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
import { BoxWithShadowMax } from './BoxWithShadow';

export const AppWrapper: React.FC<PropsWithChildren> = (props) => {
    return (
        <Box paddingLeft={2} paddingRight={2} paddingBottom={2}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <BoxWithShadowMax>{props.children}</BoxWithShadowMax>
            </motion.div>
        </Box>
    );
};
