import { Heading, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { authenticateUserHook } from '../../../hooks/customHooks';
import { UserRegisterDto } from '../../../utils/dto';
import { FormBox, GenericInput, SubmitButton } from '../../components/form';
import {
    validatePassword,
    validateUsername,
} from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const RegisterPage = () => {
    const toast = useToast();
    document.title = 'Register';

    return (
        <AppWrapper
            children={
                <FormBox
                    upperSection={<Heading>Register</Heading>}
                    innerForm={RegisterForm()}
                />
            }
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
                        <SubmitButton isSubmitting={isSubmitting} />
                    </form>
                )}
            </Formik>
        );
    }
};
