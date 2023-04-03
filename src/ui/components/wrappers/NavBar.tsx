import { Box, HStack, useColorModeValue } from '@chakra-ui/react';

export const NavBar = ({ children }: any) => {
    return (
        <Box>
            <Box p={2}>
                <Box
                    padding={2}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow={{
                        base: 'none',
                        sm: useColorModeValue('md', 'md-dark'),
                    }}
                >
                    <HStack>{children}</HStack>
                </Box>
            </Box>
        </Box>
    );
};
