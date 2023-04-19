import { Heading, Link as ChakraLink, Text, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { authenticateUserHook } from '../../../hooks/customHooks';
import { GenericInput, SubmitButton } from '../../components/form';
import {
    validatePassword,
    validateUsername,
} from '../../components/form/validation/validation';
import { FormWrapper } from '../../components/wrappers/BoxWithShadow';

export const LoginPage = () => {
    const initialValue = { username: '', password: '' };
    const toast = useToast();
    const { t } = useTranslation();
    document.title = 'Login';

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
                            fieldTitle={t('Authentication.Name')}
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
