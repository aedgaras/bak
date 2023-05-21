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
import { ResultsService } from '../../../services';
import { UpdateResultDto } from '../../../types/dto';
import { CaseValues } from '../../../utils';

export const ResultDetails = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay>
            <FormWrapper>
                <Heading size={'lg'} sx={{ p: 2 }}>
                    {t('Form.DiagnosesResultsDetails')}
                </Heading>
                <ResultUpdateForm />
            </FormWrapper>
        </DataDisplay>
    );
};

const ResultUpdateForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const toast = useToast();
    const { t } = useTranslation();

    const result = useQuery({
        queryKey: ['resultDetails' + params.id!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.get(params.id!);
        },
    });

    if (result.isLoading) {
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
            initialValues={result.data as UpdateResultDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const dto: UpdateResultDto = {
                    caseType:
                        parseInt(values.caseType.toString()) ??
                        result.data?.description,
                    description: values.description ?? result.data?.description,
                    result: values.result ?? result.data?.result,
                };

                const service = new ResultsService();

                service.update(result.data?.id.toString()!, dto).then(() => {
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
                        isInvalid={!!errors.result && touched.result}
                        p={2}
                        isRequired
                        isDisabled={state.classification !== 'Veterinarian'}
                    >
                        <FormLabel>{t('Form.Diagnosis.Diagnosis')}</FormLabel>
                        <Field
                            as={Input}
                            type="text"
                            name="result"
                            placeholder={result.data?.result}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.result}
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
                            placeholder={new Date(result.data?.description!)}
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
                        <FormLabel>
                            {t('Form.Diagnosis.Result.ResultType')}
                        </FormLabel>
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
                            isDisabled={state.classification !== 'Veterinarian'}
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
