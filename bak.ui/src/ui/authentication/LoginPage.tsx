import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Text,
} from '@chakra-ui/react';
import { Field, Form, Formik, useFormik } from 'formik';
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

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: loginSchema,
        onSubmit: (values, formikHelpers) => {
            console.log(values);
        },
    });

    return (
        <AppWrapper>
            <Center>
                <Box padding={2} borderWidth={1} borderRadius={'lg'}>
                    <Text>Login</Text>
                    <HStack>
                        <Formik
                            initialValues={initialValue}
                            onSubmit={(values, actions) => {
                                actions.setSubmitting(true);
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name="username">
                                        {(prop) => (
                                            <FormControl>
                                                <FormLabel>Name</FormLabel>

                                                <Input
                                                    name={'username'}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.username
                                                    }
                                                ></Input>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <FormControl>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            name={'password'}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        ></Input>
                                    </FormControl>
                                    <FormControl>
                                        <Button
                                            type="submit"
                                            isLoading={props.isSubmitting}
                                        >
                                            Submit
                                        </Button>
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
