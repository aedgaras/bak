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
import { UserRegisterDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import { validateUsername } from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithBorder } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const AnimalCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <BoxWithBorder>
                        <VStack>
                            <Heading size={'lg'} sx={{ p: 2 }}>
                                {t('Form.AnimalCreate')}
                            </Heading>
                            <AnimalCreationForm />
                        </VStack>
                    </BoxWithBorder>
                }
            />
        </AppWrapper>
    );
};

const AnimalCreationForm = () => {
    const { state } = useUserContext();
    const AnimalType = ['Dog', 'Cat'];
    const Users = ['A', 'B'];

    return (
        <Formik
            initialValues={{} as UserRegisterDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    {state.role === 'Admin' ? (
                        <FormControl p={2}>
                            <FormLabel>{t('Form.Animal.User')}</FormLabel>
                            <Select>
                                {Users.map((key) => {
                                    return <option value={key}>{key}</option>;
                                })}
                            </Select>
                        </FormControl>
                    ) : null}

                    <GenericInput
                        fieldTitle={t('Form.Animal.Name')}
                        fieldName={'Name'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.username}
                        touchedField={touched.username}
                        validation={validateUsername}
                    />

                    <FormControl p={2}>
                        <FormLabel>{t('Form.Animal.Type')}</FormLabel>
                        <Select>
                            {AnimalType.map((key) => {
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
