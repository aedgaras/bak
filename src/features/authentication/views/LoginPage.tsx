import { Link as ChakraLink, Heading, Text, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GenericInput, SubmitButton } from '../../../components';
import {
    validatePassword,
    validateUsername,
} from '../../../components/form/validation/validation';
import { FormWrapper } from '../../../components/wrappers';
import { authenticateUserHook } from '../hooks';

export const LoginPage = () => {
    const initialValue = { username: '', password: '' };
    const toast = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Pages.Login');
    }, []);

    return (
        <FormWrapper>
            <Heading>{t('Authentication.Login')}</Heading>
            <Link to="auth/register">
                <ChakraLink>
                    <Text color={'muted'}>
                        {t('Authentication.DontHaveAccount')}
                    </Text>
                </ChakraLink>
            </Link>
            {LoginForm()}
        </FormWrapper>
    );

    function LoginForm() {
        return (
            <Formik
                initialValues={initialValue}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    await authenticateUserHook(toast, 'login', values, t);
                }}
            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <GenericInput
                            fieldTitle={t('Authentication.Username')}
                            fieldName={'username'}
                            fieldType={'text'}
                            isRequired={true}
                            errorField={errors.username}
                            touchedField={touched.username}
                            validation={validateUsername}
                        />
                        <GenericInput
                            fieldTitle={t('Authentication.Password')}
                            fieldName={'password'}
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
