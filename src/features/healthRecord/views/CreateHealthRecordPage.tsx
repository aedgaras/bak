import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { GenericInput, SubmitButton } from '../../../components';
import { DataDisplay, FormWrapper } from '../../../components/wrappers';
import { queryClient } from '../../../lib/query';
import { useUserContext } from '../../../providers/UserProvider';
import { HealthRecordService } from '../../../services';
import { CreateHealthRecordDto } from '../../../types';

export const CreateHealthRecordPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Pages.HealthRecordCreate');
    }, []);

    return (
        <DataDisplay>
            <FormWrapper>
                <Heading size={'lg'} sx={{ p: 2 }}>
                    {t('Form.HealthRecordCreate')}
                </Heading>
                <HealthRecordCreationForm />
            </FormWrapper>
        </DataDisplay>
    );
};

const HealthRecordCreationForm = () => {
    const { state } = useUserContext();
    const params = useParams<{ animalId: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={{} as CreateHealthRecordDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                values = { ...values, animalId: parseInt(params.animalId!) };
                const service = new HealthRecordService();

                service.add(values).then(() => {
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
                        fieldTitle={t('Form.HealthRecord.HeartRate')}
                        fieldName={'HeartRate'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.heartRate}
                        touchedField={touched.heartRate}
                        validation={() => ''}
                    />

                    <FormControl
                        isInvalid={!!errors.description && touched.description}
                        p={2}
                        isRequired
                    >
                        <FormLabel>
                            {t('Form.HealthRecord.Description')}
                        </FormLabel>
                        <Field as={Textarea} type="text" name="description" />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.description}
                        </FormErrorMessage>
                    </FormControl>
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
