import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Select,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { AnimalService, UserService } from '../../../services';
import { CreateAnimalDto } from '../../../utils/dto';
import { AnimalValues } from '../../../utils/utils';
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
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['animalCreation'],
        queryFn: async () => {
            const userService = new UserService();
            return await userService.list();
        },
    });

    return (
        <Formik
            initialValues={{} as CreateAnimalDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const service = new AnimalService();

                service.add(values).then(() => {
                    navigate(-1);
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    {state.role === 'Admin' ? (
                        <FormControl p={2}>
                            <FormLabel>{t('Form.Animal.User')}</FormLabel>
                            <Field as={Select} name="userId" required>
                                {data?.map((key) => {
                                    return (
                                        <option value={key.id}>
                                            {key.username}
                                        </option>
                                    );
                                })}
                            </Field>
                            <FormErrorMessage>
                                <FormErrorIcon />
                                {errors.userId}
                            </FormErrorMessage>
                        </FormControl>
                    ) : null}

                    <GenericInput
                        fieldTitle={t('Form.Animal.Name')}
                        fieldName={'Name'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.name}
                        touchedField={touched.name}
                        validation={validateUsername}
                    />

                    <FormControl p={2}>
                        <FormLabel>{t('Form.Animal.Type')}</FormLabel>
                        <Field as={Select} name="type" required>
                            {AnimalValues.map((key) => {
                                return (
                                    <option value={key.value}>
                                        {t(`${key.key}`)}
                                    </option>
                                );
                            })}
                        </Field>
                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.type}
                        </FormErrorMessage>
                    </FormControl>
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
