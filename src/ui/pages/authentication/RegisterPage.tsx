import { Heading, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { authenticateUserHook } from '../../../hooks/customHooks';
import { UserRegisterDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import {
    validatePassword,
    validateUsername,
} from '../../components/form/validation/validation';
import { FormWrapper } from '../../components/wrappers/BoxWithShadow';

export const RegisterPage = () => {
    const toast = useToast();
    const { t } = useTranslation();
    document.title = 'Register';

    return (
        <FormWrapper>
            <Heading>{t('Authentication.Register')}</Heading>
            {RegisterForm()}
        </FormWrapper>
    );

    function RegisterForm() {
        return (
            <Formik
                initialValues={
                    { username: '', password: '' } as UserRegisterDto
                }
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    await authenticateUserHook(toast, 'register', values, t);
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
                            fieldTitle={t('Form.Name')}
                            fieldName={'name'}
                            fieldType={'text'}
                            isRequired={false}
                            errorField={errors.username}
                            touchedField={touched.username}
                            validation={() => ''}
                        />
                        <SubmitButton isSubmitting={isSubmitting} />
                    </form>
                )}
            </Formik>
        );
    }
};
