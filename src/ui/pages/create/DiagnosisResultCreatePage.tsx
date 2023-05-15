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
import { t } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import {
    CasesService,
    DiagnosisService,
    ResultsService,
    UserService,
} from '../../../services';
import { CreateResultDto } from '../../../utils/dto';
import { CaseValues } from '../../../utils/utils';
import { GenericInput, SubmitButton } from '../../components/form';
import {
    validatePassword,
    validateUsername,
} from '../../components/form/validation/validation';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const DiagnosisResultsCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();
    useEffect(() => {
        document.title = t('Pages.ResultCreate');
    }, []);

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <BoxWithShadow>
                    <VStack px={12}>
                        <Heading size={'lg'} sx={{ p: 2 }}>
                            {t('Form.DiagnosisResult.Create')}
                        </Heading>
                        <DiagnosisResultsCreationForm />
                    </VStack>
                </BoxWithShadow>
            }
        />
    );
};

const DiagnosisResultsCreationForm = () => {
    const { state } = useUserContext();
    const params = useParams<{ diagnosisId: string }>();
    const navigate = useNavigate();

    const diagnosis = useQuery({
        queryKey: ['diagnosis' + params.diagnosisId!],
        queryFn: async () => {
            const diagnosisService = new DiagnosisService();
            return await diagnosisService.get(params.diagnosisId!);
        },
    });

    const animal = useQuery({
        queryKey: ['diagnosisAnimal' + params.diagnosisId!],
        queryFn: async () => {
            const service = new CasesService();

            if (diagnosis.data) {
                return await service.getAnimalByCase(
                    diagnosis?.data.caseId.toString()
                );
            }
        },
        enabled: !!diagnosis,
    });

    const user = useQuery({
        queryKey: ['diagnosisUser' + params.diagnosisId!],
        queryFn: async () => {
            const userService = new UserService();

            if (animal.data) {
                return await userService.getUserById(
                    animal?.data?.userId?.toString()
                );
            }
        },
        enabled: !!animal,
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
                    actions.setSubmitting(false);
                    navigate(-1);
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
                                <FormControl p={2} isRequired isDisabled>
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
