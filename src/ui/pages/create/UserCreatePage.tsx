import {
    FormControl,
    FormLabel,
    Heading,
    Select,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../../context/UserContext';
import { UserService } from '../../../services';
import { UserRegisterDto } from '../../../utils/dto';
import { Classification, Role } from '../../../utils/Models';
import {
    GenericInput,
    GenericSelect,
    SubmitButton,
} from '../../components/form';
import {
    validatePassword,
    validateUsername,
} from '../../components/form/validation/validation';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const UserCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <BoxWithShadow>
                    <VStack>
                        <Heading size={'lg'} sx={{ p: 2 }}>
                            {t('Form.UserCreate')}
                        </Heading>
                        <UserCreationForm />
                    </VStack>
                </BoxWithShadow>
            }
        />
    );
};

const UserCreationForm = () => {
    const { state } = useUserContext();
    const classification: Classification[] = ['Veterinarian', 'Specialist'];
    const specification: Role[] = ['Admin', 'User'];

    return (
        <Formik
            initialValues={{} as UserRegisterDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const service = new UserService();
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <GenericInput
                        fieldTitle="Form.Username"
                        fieldName={'Username'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.username}
                        touchedField={touched.username}
                        validation={validateUsername}
                    />
                    <GenericInput
                        fieldTitle="Form.Password"
                        fieldName={'Password'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.password}
                        touchedField={touched.password}
                        validation={validatePassword}
                    />
                    <GenericInput
                        fieldTitle={t('Form.Email')}
                        fieldName={'Email'}
                        fieldType={'email'}
                        isRequired={true}
                        errorField={errors.password}
                        touchedField={touched.password}
                        validation={validatePassword}
                    />
                    <GenericInput
                        fieldTitle={t('Form.PhoneNumber')}
                        fieldName={'Phonenumber'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.password}
                        touchedField={touched.password}
                        validation={validatePassword}
                    />
                    <GenericSelect
                        fieldTitle="Form.Classification"
                        keys={classification}
                    />
                    <FormControl p={2}>
                        <FormLabel>{t(`Form.Specification`)}</FormLabel>
                        <Select>
                            {specification.map((key) => {
                                return (
                                    <option value={key}>{t(`${key}`)}</option>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
