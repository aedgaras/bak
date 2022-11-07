import { Box, Button, Heading, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { authenticateUserHook } from '../../../hooks/customHooks';
import { UserRegisterDto } from '../../../utils/dto/User';
import {
    validatePassword,
    validateUsername,
} from '../../../utils/validation/validation';
import {
    FormBox,
    GenericInput,
} from '../../components/datadisplay/generic/form';

export const RegisterPage = () => {
    const toast = useToast();
    document.title = 'Register';

    return (
        <FormBox
            upperSection={<Heading>Register</Heading>}
            innerForm={RegisterForm()}
        />
    );

    function RegisterForm() {
        return (
            <Formik
                initialValues={
                    { username: '', password: '' } as UserRegisterDto
                }
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    await authenticateUserHook(toast, 'register', values);
                    actions.setSubmitting(false);
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
                        <GenericInput
                            fieldName={'Name'}
                            fieldType={'text'}
                            isRequired={false}
                            errorField={errors.name}
                            touchedField={touched.name}
                            validation={() => ''}
                        />
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
        );
    }
};
