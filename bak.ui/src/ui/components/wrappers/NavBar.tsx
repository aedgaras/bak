import { Box, HStack, useColorModeValue } from '@chakra-ui/react';
import { ElementChildren } from '../interfaces';

export const NavBar = ({ element }: ElementChildren) => {
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
                    <HStack>{element}</HStack>
                </Box>
            </Box>
        </Box>
    );
};
