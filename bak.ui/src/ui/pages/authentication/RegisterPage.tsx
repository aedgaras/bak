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
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { validatePassword, validateUsername } from '../../../hooks/customHooks';
import { AppWrapper } from '../../components/AppWrapper';

export const RegisterPage = () => {
    const initialValue = { username: '', password: '' };

    return (
        <AppWrapper>
            <VStack>
                <Center p={2}>
                    <Heading>Register</Heading>
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
                                        isRequired={true}
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
                                        isRequired={true}
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
