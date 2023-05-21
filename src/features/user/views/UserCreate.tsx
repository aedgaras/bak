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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GenericInput, SubmitButton } from '../../../components';
import {
    validatePassword,
    validateUsername,
} from '../../../components/form/validation/validation';
import { BoxWithShadow, DataDisplay } from '../../../components/wrappers';
import { queryClient } from '../../../lib/query';
import { useUserContext } from '../../../providers/UserProvider';
import { UserService } from '../../../services';
import { UserCreateDto } from '../../../types/dto';
import { ClassificationValues, RoleValues } from '../../../utils/utils';

export const UserCreate = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay>
            <BoxWithShadow>
                <VStack>
                    <Heading size={'lg'} sx={{ p: 2 }}>
                        {t('Form.UserCreate')}
                    </Heading>
                    <UserCreationForm />
                </VStack>
            </BoxWithShadow>
        </DataDisplay>
    );
};

const UserCreationForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <Box px={12}>
            <Formik
                initialValues={{} as UserCreateDto}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);

                    const service = new UserService();

                    service.add(values).then((r) => {
                        queryClient.invalidateQueries();
                        navigate(-1);
                        toast({
                            status: 'success',
                            title: t('Toast.Sucess'),
                            description: t('Toast.Created'),
                        });
                    });
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
                                            {t(
                                                `Enums.User.Classification.${x.key}`
                                            )}
                                        </option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl p={2}>
                            <FormLabel>{t(`Form.Role`)}</FormLabel>
                            <Select name="role">
                                {RoleValues.map((x) => {
                                    return (
                                        <option value={x.value}>
                                            {t(`Enums.User.Role.${x.key}`)}
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
