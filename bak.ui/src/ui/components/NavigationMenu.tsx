import { Box, Button, HStack, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const NavigationMenu = () => {
    return (
        <Box padding={2} borderWidth='1px' borderRadius='lg'>
            <HStack>
                <Link to={'/'}>
                    <Button>Home</Button>
                </Link>
                <Link to={'/login'}>
                    <Button>Login</Button>
                </Link>
                <Link to={'/register'}>
                    <Button>Register</Button>
                </Link>
                <Spacer />
                <ColorModeSwitcher />
            </HStack>
        </Box>
    );
};
