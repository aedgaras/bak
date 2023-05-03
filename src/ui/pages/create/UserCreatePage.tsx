import {
    Box,
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
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../..';
import { useUserContext } from '../../../context/UserContext';
import { UserService } from '../../../services';
import { UserCreateDto } from '../../../utils/dto';
import { ClassificationValues, RoleValues } from '../../../utils/utils';
import { GenericInput, SubmitButton } from '../../components/form';
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
    const navigate = useNavigate();

    return (
        <Box px={12}>
            <Formik
                initialValues={{} as UserCreateDto}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    console.log(values);
                    const service = new UserService();
                    service.add(values).then((r) => {
                        navigate(-1);
                        queryClient.invalidateQueries();
                    });
                    actions.setSubmitting(false);
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
                            fieldType={'password'}
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
                        <FormControl p={2}>
                            <FormLabel>{t(`Form.Specification`)}</FormLabel>
                            <Select name="classification">
                                {ClassificationValues.map((x) => {
                                    return (
                                        <option value={x.value}>
                                            {t(`${x.key}`)}
                                        </option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl p={2}>
                            <FormLabel>{t(`Form.Specification`)}</FormLabel>
                            <Select name="role">
                                {RoleValues.map((x) => {
                                    return (
                                        <option value={x.value}>
                                            {t(`${x.key}`)}
                                        </option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <SubmitButton isSubmitting={isSubmitting} />
                    </form>
                )}
            </Formik>
        </Box>
    );
};
