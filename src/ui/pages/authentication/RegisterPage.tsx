import { Heading, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../../../services';
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from '../../../utils/constants';
import { UserRegisterDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from '../../components/form/validation/validation';
import { FormWrapper } from '../../components/wrappers/BoxWithShadow';

export const RegisterPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Pages.Register');
    }, []);

    return (
        <FormWrapper>
            <Heading>{t('Authentication.Register')}</Heading>
            {RegisterForm()}
        </FormWrapper>
    );

    function RegisterForm() {
        return (
            <Formik
                initialValues={{} as UserRegisterDto}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    const service = new AuthService();

                    const tokens = await service.register(values);

                    localStorage.setItem(ACCESS_TOKEN_NAME, tokens.accessToken);
                    localStorage.setItem(
                        REFRESH_TOKEN_NAME,
                        tokens.refreshToken
                    );

                    window.location.assign('/');
                    actions.setSubmitting(false);
                }}
            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <GenericInput
                            fieldTitle={t('Form.Username')}
                            fieldName={'username'}
                            fieldType={'text'}
                            isRequired={true}
                            errorField={errors.username}
                            touchedField={touched.username}
                            validation={validateUsername}
                        />
                        <GenericInput
                            fieldTitle={t('Form.Password')}
                            fieldName={'password'}
                            fieldType={'password'}
                            isRequired={true}
                            errorField={errors.password}
                            touchedField={touched.password}
                            validation={validatePassword}
                        />
                        <GenericInput
                            fieldTitle={t('Form.Email')}
                            fieldName={'email'}
                            fieldType={'email'}
                            isRequired={true}
                            errorField={errors.email}
                            touchedField={touched.email}
                            validation={validateEmail}
                        />
                        <GenericInput
                            fieldTitle={t('Form.PhoneNumber')}
                            fieldName={'phoneNumber'}
                            fieldType={'phone'}
                            isRequired={true}
                            errorField={errors.phoneNumber}
                            touchedField={touched.phoneNumber}
                            validation={() => ''}
                        />
                        <SubmitButton isSubmitting={isSubmitting} />
                    </form>
                )}
            </Formik>
        );
    }
};
