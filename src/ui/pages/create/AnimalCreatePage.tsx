import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Select,
    Skeleton,
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
import { BoxWithBorder } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';
import { useEffect } from 'react';

export const AnimalCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Pages.AnimalCreate')
    },[])

    return (
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
    );
};

const AnimalCreationForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();

    const user = useQuery({
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
                values = {
                    ...values,
                    userId: parseInt(state?.userId!.toString()),
                };

                service.add(values).then(() => {
                    navigate(-1);
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    {!user.isLoading ? (
                        <>
                            {state.role === 'Admin' ? (
                                <FormControl p={2}>
                                    <FormLabel>
                                        {t('Form.Animal.User')}
                                    </FormLabel>
                                    <Field as={Select} name="userId" required>
                                        {user.data?.map((key) => {
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
                        </>
                    ) : (
                        <Skeleton />
                    )}
                    <GenericInput
                        fieldTitle={t('Form.Animal.Name')}
                        fieldName={'Name'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.name}
                        touchedField={touched.name}
                        validation={validateUsername}
                    />

                    <FormControl
                        p={2}
                        isInvalid={!!errors.type && touched.type}
                    >
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
                    <SubmitButton
                        isSubmitting={isSubmitting || user.isLoading}
                    />
                </form>
            )}
        </Formik>
    );
};
