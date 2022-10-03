import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AppWrapper } from '../components/AppWrapper';

export const LoginPage = () => {
    const initialValue: { username: string; password: string } = {
        username: '',
        password: '',
    };
    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    });

    return (
        <AppWrapper>
            <Center>
                <Box padding={2} borderWidth={1} borderRadius={'lg'}>
                    <Text>Login</Text>
                    <HStack>
                        <Formik
                            initialValues={initialValue}
                            validationSchema={loginSchema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input name={'username'}></Input>
                                        {errors.username && touched.username ? (
                                            <FormErrorMessage>
                                                {errors.username}
                                            </FormErrorMessage>
                                        ) : null}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Password</FormLabel>
                                        <Input name={'password'}></Input>
                                        {errors.password && touched.password ? (
                                            <FormErrorMessage>
                                                {errors.password}
                                            </FormErrorMessage>
                                        ) : null}
                                    </FormControl>
                                    <FormControl>
                                        <Button type={'submit'}>Submit</Button>
                                    </FormControl>
                                </Form>
                            )}
                        </Formik>
                    </HStack>
                </Box>
            </Center>
        </AppWrapper>
    );
};
