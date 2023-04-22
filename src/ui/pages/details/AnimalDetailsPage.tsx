import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Select,
    Skeleton,
    useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { queryClient } from '../../..';
import { useUserContext } from '../../../context/UserContext';
import { AnimalService } from '../../../services';
import { UpdateAnimalDto } from '../../../utils/dto';
import { AnimalValues } from '../../../utils/utils';
import { GenericInput, SubmitButton } from '../../components/form';
import { validateUsername } from '../../components/form/validation/validation';
import { FormWrapper } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const AnimalDetailsPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <FormWrapper>
                    <Heading size={'lg'} sx={{ p: 2 }}>
                        {t('Form.AnimalDetails')}
                    </Heading>
                    <AnimalUpdateForm />
                </FormWrapper>
            }
        />
    );
};

const AnimalUpdateForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const animal = useQuery({
        queryFn: async () => {
            const service = new AnimalService();
            return await service.get(params.id!);
        },
    });

    return (
        <Formik
            initialValues={animal.data as UpdateAnimalDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const service = new AnimalService();

                const dto: UpdateAnimalDto = {
                    type: parseInt(values.type.toString()),
                    name: values.name,
                };

                service.update(animal.data?.id!, dto).then(() => {
                    queryClient.invalidateQueries();
                    navigate(-1);
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    {!animal.isLoading ? (
                        <>
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
                        </>
                    ) : (
                        <Skeleton />
                    )}
                    <SubmitButton
                        isSubmitting={isSubmitting || animal.isLoading}
                    />
                </form>
            )}
        </Formik>
    );
};
