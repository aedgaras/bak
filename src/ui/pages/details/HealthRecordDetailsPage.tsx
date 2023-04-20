import {
    CircularProgress,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { HealthRecordService } from '../../../services';
import { HealthRecordDto, UpdateHealthRecordDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import { FormWrapper } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const HealthRecordDetailsPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <FormWrapper>
                    <Heading size={'lg'} sx={{ p: 2 }}>
                        {t('Form.HealthRecordUpdate')}
                    </Heading>
                    <HealthRecordUpdateForm />
                </FormWrapper>
            }
        />
    );
};

const HealthRecordUpdateForm = () => {
    const { state } = useUserContext();
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();

    const health = useQuery({
        queryKey: ['healthDetails' + params.id!],
        queryFn: async () => {
            const service = new HealthRecordService();
            return await service.get(params.id!);
        },
    });

    if (health.isLoading) {
        return <CircularProgress isIndeterminate />;
    }

    return (
        <Formik
            initialValues={health.data as HealthRecordDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const service = new HealthRecordService();

                const dto: Partial<UpdateHealthRecordDto> = {
                    heartRate: parseInt(values.heartRate.toString()),
                    description: values.description,
                };

                service
                    .update(params.id!, dto as UpdateHealthRecordDto)
                    .then(() => {
                        navigate(-1);
                    });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl
                        isInvalid={!!errors.heartRate && touched.heartRate}
                        p={2}
                        isRequired
                    >
                        <FormLabel>
                            {t('Form.HealthRecord.HeartRate')}
                        </FormLabel>
                        <Field
                            as={Input}
                            type="number"
                            name="heartRate"
                            placeholder={health.data?.heartRate}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.heartRate}
                        </FormErrorMessage>
                    </FormControl>

                    <GenericInput
                        fieldTitle={t('Form.HealthRecord.Description')}
                        fieldName={'Description'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.description}
                        touchedField={touched.description}
                        validation={() => ''}
                    />
                    <SubmitButton isSubmitting={isSubmitting} />
                </form>
            )}
        </Formik>
    );
};
