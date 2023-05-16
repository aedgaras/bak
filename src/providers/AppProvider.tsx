import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '../lib/query';
import { UserContextProvider } from './UserProvider';

interface AppProviderProps extends React.PropsWithChildren {}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
    return (
        <ChakraProvider theme={theme}>
            <AnimatePresence exitBeforeEnter>
                <QueryClientProvider client={queryClient}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                    >
                        <UserContextProvider>
                            <Box
                                sx={{
                                    backgroundImage:
                                        'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)',
                                    filter: 'alpha(opacity=50)',
                                }}
                                height={'100vh'}
                            >
                                <Box>
                                    <BrowserRouter>
                                        {props.children}
                                    </BrowserRouter>
                                </Box>
                            </Box>
                        </UserContextProvider>
                    </motion.div>
                </QueryClientProvider>
            </AnimatePresence>
        </ChakraProvider>
    );
};
