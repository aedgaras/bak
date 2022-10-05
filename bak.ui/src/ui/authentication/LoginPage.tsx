import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
    Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { AppWrapper } from '../components/AppWrapper';

export const LoginPage = () => {
    const initialValue = { username: '', password: '' };

    return (
        <AppWrapper>
            <Center>
                <Box padding={2} borderWidth={1} borderRadius={'lg'}>
                    <Text>Login</Text>
                    <HStack>
                        <Formik
                            initialValues={initialValue}
                            onSubmit={(values, actions) => {
                                console.log(values);
                                actions.setSubmitting(true);
                            }}
                        >
                            {({
                                handleSubmit,
                                errors,
                                touched,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <FormControl
                                        isInvalid={
                                            !!errors.username &&
                                            touched.username
                                        }
                                    >
                                        <Field
                                            as={Input}
                                            type="text"
                                            name="username"
                                            validate={(value: any) => {
                                                let error;

                                                if (!value) {
                                                    error =
                                                        'Username is required!';
                                                }
                                                return error;
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {errors.username}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors.password &&
                                            touched.password
                                        }
                                    >
                                        <Field
                                            as={Input}
                                            type="password"
                                            name="password"
                                            validate={(value: any) => {
                                                let error;

                                                if (!value) {
                                                    error =
                                                        'Password is required!';
                                                }
                                                return error;
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {errors.password}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </HStack>
                </Box>
            </Center>
        </AppWrapper>
    );
};
