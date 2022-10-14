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
    useToast,
    VStack,
} from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { Field, Formik } from 'formik';
import { UserRegisterDto } from '../../../dto/User';
import { validatePassword, validateUsername } from '../../../hooks/customHooks';
import { JWT_NAME } from '../../../services/Authentication';
import { sleep } from '../../../utils/utils';
import { AppWrapper } from '../../components/AppWrapper';

export const RegisterPage = () => {
    const initialValue: UserRegisterDto = { username: '', password: '' };
    const toast = useToast();
    document.title = 'Register';

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
                            onSubmit={async (values, actions) => {
                                const userPayload = values;
                                actions.setSubmitting(true);
                                await axios
                                    .post(
                                        'http://localhost:3030/api/auth/register',
                                        userPayload
                                    )
                                    .then((r) => {
                                        toast({
                                            title: 'Success',
                                            description:
                                                'Registered successfully.',
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                        });
                                        sleep(5000);
                                        localStorage.setItem(JWT_NAME, r.data);
                                        window.location.assign('/');
                                    })
                                    .catch((e: AxiosError) => {
                                        toast({
                                            title: e.code,
                                            description:
                                                (e.response?.data as string) ??
                                                e.message,
                                            status: 'error',
                                            duration: 9000,
                                            isClosable: true,
                                        });
                                    });
                                actions.setSubmitting(false);
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
                                    <FormControl
                                        isInvalid={
                                            !!errors.name && touched.name
                                        }
                                        p={2}
                                        isRequired={false}
                                    >
                                        <FormLabel>Name</FormLabel>
                                        <Field
                                            as={Input}
                                            type="name"
                                            name="name"
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
