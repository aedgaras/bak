import { Box, Center, HStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { AppWrapper } from '../components/AppWrapper';

export const LoginPage = () => {
    const initialValue = {};

    return (
        <AppWrapper>
            <Center>
                <Box padding={2} borderWidth={1}>
                    <HStack>
                        <Formik
                            initialValues={initialValue}
                            onSubmit={() => {}}
                        ></Formik>
                    </HStack>
                </Box>
            </Center>
        </AppWrapper>
    );
};
