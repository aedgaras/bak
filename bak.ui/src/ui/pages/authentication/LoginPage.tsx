import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link as ChakraLink,
    Text,
    useColorModeValue,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
    fetchThisUser,
    validatePassword,
    validateUsername,
} from '../../../hooks/customHooks';
import { AppWrapper } from '../../components/AppWrapper';

export const LoginPage = () => {
    const initialValue = { username: '', password: '' };
    const toast = useToast();
    const navigate = useNavigate();
    document.title = 'Login';

    return (
        <AppWrapper>
            <VStack>
                <Center p={2}>
                    <VStack>
                        <Heading>Login</Heading>
                        <Link to="/register">
                            <ChakraLink>
                                <Text color={'muted'}>
                                    Don't have an account? Register
                                </Text>
                            </ChakraLink>
                        </Link>
                    </VStack>
                </Center>
                <Box
                    padding={2}
                    borderWidth={1}
                    borderRadius={'lg'}
                    boxShadow={{
                        base: 'none',
                        sm: useColorModeValue('md', 'md-dark'),
                    }}
                >
                    <HStack>
                        <Formik
                            initialValues={initialValue}
                            onSubmit={async (values, actions) => {
                                actions.setSubmitting(true);
                                await fetchThisUser(
                                    toast,
                                    '/auth/login',
                                    {
                                        username: values.username,
                                        password: values.password,
                                    },
                                    {
                                        title: 'Succes',
                                        description: 'Logged in successfully.',
                                    }
                                );
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
                                            color="teal"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </HStack>
                </Box>
            </VStack>
        </AppWrapper>
    );
};
