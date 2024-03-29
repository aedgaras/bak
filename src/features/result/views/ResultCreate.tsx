import {
    Box,
    CircularProgress,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    SimpleGrid,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
    GenericInput,
    SubmitButton,
    validatePassword,
    validateUsername,
} from '../../../components';
import { BoxWithShadow, DataDisplay } from '../../../components/wrappers';
import { queryClient } from '../../../lib/query';
import { useUserContext } from '../../../providers/UserProvider';
import {
    CasesService,
    DiagnosisService,
    ResultsService,
    UserService,
} from '../../../services';
import { CreateResultDto } from '../../../types';
import { CaseValues } from '../../../utils';

export const ResultCreate = () => {
    const toast = useToast();
    const { t } = useTranslation();
    useEffect(() => {
        document.title = t('Pages.ResultCreate');
    }, []);

    return (
        <DataDisplay>
            <BoxWithShadow>
                <VStack px={12}>
                    <Heading size={'lg'} sx={{ p: 2 }}>
                        {t('Form.DiagnosisResult.Create')}
                    </Heading>
                    <DiagnosisResultsCreationForm />
                </VStack>
            </BoxWithShadow>
        </DataDisplay>
    );
};

const DiagnosisResultsCreationForm = () => {
    const { state } = useUserContext();
    const params = useParams<{ diagnosisId: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();

    const diagnosis = useQuery({
        queryKey: ['resultDetailsDiagnosis' + params.diagnosisId!],
        queryFn: async () => {
            const diagnosisService = new DiagnosisService();
            return await diagnosisService.get(params.diagnosisId!);
        },
    });

    const animal = useQuery({
        queryKey: ['resultDetailsAnimal' + params.diagnosisId!],
        queryFn: async () => {
            const service = new CasesService();

            if (diagnosis.data) {
                return await service.getAnimalByCase(
                    diagnosis?.data.caseId.toString()
                );
            }
        },
        enabled: !diagnosis.isLoading,
    });

    const user = useQuery({
        queryKey: ['resultDetailsUser' + params.diagnosisId!],
        queryFn: async () => {
            const userService = new UserService();

            if (animal.data) {
                return await userService.getUserById(
                    animal?.data?.userId?.toString()
                );
            }
        },
        enabled: !animal.isLoading,
    });

    return (
        <Formik
            initialValues={
                {
                    caseDiagnosisId: diagnosis.data?.caseId!,
                    userId: parseInt(state.userId?.toString()!),
                } as CreateResultDto
            }
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const service = new ResultsService();
                values = {
                    ...values,
                    caseDiagnosisId: diagnosis.data?.caseId!,
                    userId: parseInt(state.userId!.toString()),
                    caseType: !values.caseType
                        ? 0
                        : parseInt(values.caseType.toString()),
                };

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
                    <SimpleGrid columns={[1, 2, 2, 2]}>
                        {(!diagnosis.isLoading ||
                            !user.isLoading ||
                            !animal.isLoading) &&
                        animal.data &&
                        user.data &&
                        diagnosis.data ? (
                            <Box>
                                <FormControl p={2}>
                                    <FormLabel>
                                        {t('Form.Diagnosis.Result.User')}
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        disabled
                                        value={user.data?.username}
                                    ></Field>
                                </FormControl>
                                <FormControl p={2}>
                                    <FormLabel>
                                        {t('Form.Diagnosis.Result.Animal')}
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        disabled
                                        value={animal.data?.name}
                                    ></Field>
                                </FormControl>
                                <FormControl p={2}>
                                    <FormLabel>
                                        {t('Form.Diagnosis.Result.Diangosis')}
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        disabled
                                        value={diagnosis?.data?.diagnosis}
                                    ></Field>
                                </FormControl>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress isIndeterminate />
                            </Box>
                        )}
                        <Box>
                            <FormControl
                                p={2}
                                isInvalid={
                                    !!errors.caseType && touched.caseType
                                }
                                isRequired
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
                            <GenericInput
                                fieldTitle={t('Form.Diagnosis.Result.Name')}
                                fieldName={'Result'}
                                fieldType={'textarea'}
                                isRequired={true}
                                errorField={errors.result}
                                touchedField={touched.result}
                                validation={validateUsername}
                            />
                            <GenericInput
                                fieldTitle={t(
                                    'Form.Diagnosis.Result.Description'
                                )}
                                fieldName={'Description'}
                                fieldType={'textarea'}
                                isRequired={true}
                                errorField={errors.description}
                                touchedField={touched.description}
                                validation={validatePassword}
                                textArea={true}
                            />
                        </Box>
                    </SimpleGrid>
                    <Flex justifyContent={'center'}>
                        <SubmitButton
                            isSubmitting={
                                isSubmitting ||
                                diagnosis.isLoading ||
                                user.isLoading ||
                                animal.isLoading
                            }
                        />
                    </Flex>
                </form>
            )}
        </Formik>
    );
};
