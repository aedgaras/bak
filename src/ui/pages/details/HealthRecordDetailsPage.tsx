import {
    Box,
    Button,
    Center,
    CircularProgress,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { queryClient } from '../../..';
import { isUser, useUserContext } from '../../../context/UserContext';
import { HealthRecordService } from '../../../services';
import { HealthRecordDto, UpdateHealthRecordDto } from '../../../utils/dto';
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
        cacheTime: 0,
    });

    if (health.isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress isIndeterminate />
            </Box>
        );
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
                        queryClient.invalidateQueries();
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
                        isDisabled={isUser()}
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
                    <FormControl
                        isInvalid={!!errors.description && touched.description}
                        p={2}
                        isRequired
                        isDisabled={isUser()}
                    >
                        <FormLabel>
                            {t('Form.HealthRecord.Description')}
                        </FormLabel>
                        <Field
                            as={Textarea}
                            type="text"
                            name="description"
                            placeholder={health.data?.description}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.description}
                        </FormErrorMessage>
                    </FormControl>

                    <Center p={2}>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            isDisabled={isUser()}
                            color="teal"
                        >
                            {t('Form.Submit')}
                        </Button>
                    </Center>
                </form>
            )}
        </Formik>
    );
};
