import { Heading, Link as ChakraLink, Text, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { authenticateUserHook } from '../../../hooks/customHooks';
import {
    validatePassword,
    validateUsername,
} from '../../../utils/validation/validation';
import { FormBox, GenericInput, SubmitButton } from '../../components/form';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const LoginPage = () => {
    const initialValue = { username: '', password: '' };
    const toast = useToast();
    document.title = 'Login';

    return (
        <AppWrapper
            children={
                <FormBox
                    upperSection={
                        <>
                            <Heading>Login</Heading>
                            <Link to="/register">
                                <ChakraLink>
                                    <Text color={'muted'}>
                                        Don't have an account? Register
                                    </Text>
                                </ChakraLink>
                            </Link>
                        </>
                    }
                    innerForm={LoginForm()}
                />
            }
        />
    );

    function LoginForm() {
        return (
            <Formik
                initialValues={initialValue}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    await authenticateUserHook(toast, 'login', values);
                }}
            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <GenericInput
                            fieldName={'Username'}
                            fieldType={'text'}
                            isRequired={true}
                            errorField={errors.username}
                            touchedField={touched.username}
                            validation={validateUsername}
                        />
                        <GenericInput
                            fieldName={'Password'}
                            fieldType={'password'}
                            isRequired={true}
                            errorField={errors.password}
                            touchedField={touched.password}
                            validation={validatePassword}
                        />
                        <SubmitButton isSubmitting={isSubmitting} />
                    </form>
                )}
            </Formik>
        );
    }
};
