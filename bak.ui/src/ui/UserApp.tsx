import { Center, Heading, Highlight } from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { AppWrapper } from './components/AppWrapper';

export const UserApp = () => {
    const userContext = useContext(UserContext);
    document.title = 'Blossom HR';
    return (
        <AppWrapper>
            <Center height={'100vh'}>
                <Heading lineHeight="tall">
                    <Highlight
                        query={['spotlight', 'emphasize', 'Accentuate']}
                        styles={{
                            px: '2',
                            py: '1',
                            rounded: 'full',
                            bg: 'teal.100',
                        }}
                    >
                        With the Highlight component, you can spotlight,
                        emphasize and accentuate words.
                    </Highlight>
                </Heading>
            </Center>
        </AppWrapper>
    );
};
