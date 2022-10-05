import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { validatePassword, validateUsername } from '../../hooks/customHooks';
import { AppWrapper } from '../components/AppWrapper';

export const RegisterPage = () => {
    const initialValue = { username: '', password: '' };

    return (
        <AppWrapper>
            <Center>
                <Box padding={2} borderWidth={1} borderRadius={'lg'}>
                    <Box p={2}>
                        <Text>Login</Text>
                    </Box>
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
                                        p={2}
                                    >
                                        <FormLabel>Username</FormLabel>
                                        <Field
                                            as={Input}
                                            type="text"
                                            name="username"
                                            validate={(value: string) =>
                                                validateUsername(value)
                                            }
                                        />

                                        <FormErrorMessage>
                                            <FormErrorIcon />
                                            {errors.username}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors.password &&
                                            touched.password
                                        }
                                        p={2}
                                    >
                                        <FormLabel>Password</FormLabel>
                                        <Field
                                            as={Input}
                                            type="password"
                                            name="password"
                                            validate={(value: string) =>
                                                validatePassword(value)
                                            }
                                        />
                                        <FormErrorMessage>
                                            <FormErrorIcon />

                                            {errors.password}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <Box p={2}>
                                        <Button
                                            type="submit"
                                            isLoading={isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </HStack>
                </Box>
            </Center>
        </AppWrapper>
    );
};
