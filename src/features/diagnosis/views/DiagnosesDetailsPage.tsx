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
    Select,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { DataDisplay, FormWrapper } from '../../../components/wrappers';
import { queryClient } from '../../../lib/query';
import { useUserContext } from '../../../providers/UserProvider';
import { DiagnosisService } from '../../../services';
import { UpdateDiagnosisDto } from '../../../types';
import { CaseValues } from '../../../utils';

export const DiagnosesDetailsPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay>
            <FormWrapper>
                <Heading size={'lg'} sx={{ p: 2 }}>
                    {t('Form.DiagnosesDetails')}
                </Heading>
                <DiagnosisUpdateForm />
            </FormWrapper>
        </DataDisplay>
    );
};

const DiagnosisUpdateForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const toast = useToast();
    const { t } = useTranslation();

    const diagnosis = useQuery({
        queryKey: ['diagnosisDetails' + params.id!],
        queryFn: async () => {
            const service = new DiagnosisService();
            return await service.get(params.id!);
        },
    });

    if (diagnosis.isLoading) {
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
            initialValues={diagnosis.data as UpdateDiagnosisDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const service = new DiagnosisService();

                const dto: UpdateDiagnosisDto = {
                    caseType: parseInt(values.caseType.toString()),
                    diagnosis: values.diagnosis,
                    description: values.description,
                };

                service.update(diagnosis.data?.id.toString()!, dto).then(() => {
                    queryClient.invalidateQueries();
                    navigate(-1);
                    toast({
                        status: 'success',
                        title: t('Toast.Sucess'),
                        description: t('Toast.Updated'),
                    });
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl
                        isInvalid={!!errors.diagnosis && touched.diagnosis}
                        p={2}
                        isRequired
                        isDisabled={state.classification !== 'Veterinarian'}
                    >
                        <FormLabel>{t('Form.Diagnosis.Diagnosis')}</FormLabel>
                        <Field
                            as={Input}
                            type="text"
                            name="diagnosis"
                            placeholder={diagnosis.data?.diagnosis}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.diagnosis}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isInvalid={!!errors.description && touched.description}
                        p={2}
                        isRequired
                        isDisabled={state.classification !== 'Veterinarian'}
                    >
                        <FormLabel>
                            {t('Form.HealthRecord.Description')}
                        </FormLabel>
                        <Field
                            as={Textarea}
                            type="text"
                            name="description"
                            placeholder={diagnosis.data?.description}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.description}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        p={2}
                        isInvalid={!!errors.caseType && touched.caseType}
                        isRequired
                        isDisabled={state.classification !== 'Veterinarian'}
                    >
                        <FormLabel>{t('Form.Diagnosis.Type')}</FormLabel>
                        <Field as={Select} name="caseType" required>
                            {CaseValues.map((key) => {
                                return (
                                    <option value={key.value}>
                                        {t(
                                            `Enums.Case.Type.${key.key}`
                                        ).toString()}
                                    </option>
                                );
                            })}
                        </Field>
                    </FormControl>
                    <Center p={2}>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            isDisabled={
                                state.classification !== 'Veterinarian' &&
                                state.role !== 'Admin'
                            }
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
