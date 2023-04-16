import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    SimpleGrid,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { CasesService, DiagnosisService } from '../../../services';
import { CaseDto, CreateDiagnosisDto } from '../../../utils/dto';
import {
    CaseValues,
    getAnimalType,
    getStatusType,
    getUrgencyType,
} from '../../../utils/utils';
import { GenericInput, SubmitButton } from '../../components/form';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const DiagnosisCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    const params = useParams<{ caseId: string }>();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['diagnosisCreate1' + params.caseId!],
        queryFn: async () => {
            const recipeService = new CasesService();
            return await recipeService.getCase(params.caseId!);
        },
    });

    const animalByCase = useQuery({
        queryKey: ['animalByCase' + params.caseId!],
        queryFn: async () => {
            const recipeService = new CasesService();
            return await recipeService.getAnimalByCase(params.caseId!);
        },
    });

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <SimpleGrid columns={[1, null, null, 2]} gap={4}>
                        <BoxWithShadow>
                            <VStack>
                                <Heading size={'lg'} sx={{ p: 2 }}>
                                    {t('Form.Diagnosis.Case')}
                                </Heading>
                                <Box p={2}>
                                    <FormControl py={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Pulse')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={
                                                data?.healthRecord?.heartRate
                                            }
                                        ></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Description')}
                                        </FormLabel>
                                        <Textarea
                                            resize={'none'}
                                            disabled
                                            value={
                                                data?.healthRecord?.description
                                            }
                                        ></Textarea>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.AnimalType')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={getAnimalType(
                                                animalByCase.data?.type!
                                            )}
                                        ></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.CaseDate')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={
                                                data?.healthRecord?.entryDate
                                            }
                                        ></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Status')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={getStatusType(data?.status!)}
                                        ></Input>
                                    </FormControl>
                                    <FormControl pb={2}>
                                        <FormLabel>
                                            {t('Form.Diangosis.Priority')}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            disabled
                                            value={getUrgencyType(
                                                data?.urgency!
                                            )}
                                        ></Input>
                                    </FormControl>
                                </Box>
                            </VStack>
                        </BoxWithShadow>
                        <BoxWithShadow>
                            <VStack>
                                <Heading size={'lg'} sx={{ p: 2 }}>
                                    {t('Form.Diagnosis.Diangosis')}
                                </Heading>
                                <DiangosisCreationForm
                                    id={params.caseId!}
                                    data={data!}
                                />
                            </VStack>
                        </BoxWithShadow>
                    </SimpleGrid>
                }
            />
        </AppWrapper>
    );
};

const DiangosisCreationForm = ({ id, data }: { id: string; data: CaseDto }) => {
    const { state } = useUserContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{} as CreateDiagnosisDto}
            onSubmit={async (values, actions) => {
                const service = new DiagnosisService();
                actions.setSubmitting(true);

                values = {
                    ...values,
                    userId: parseInt(state.userId?.toString()!),
                    caseId: parseInt(id),
                };

                service.addDiagnosis(values).then(() => {
                    navigate(-1);
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl p={2}>
                        <FormLabel>{t('Form.Diagnosis.Type')}</FormLabel>
                        <Select>
                            {CaseValues.map((key) => {
                                return (
                                    <option value={key.value}>
                                        {t(`${key.key}`)}
                                    </option>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <GenericInput
                        fieldTitle={t('Form.Diagnosis.Diagnosis')}
                        fieldName={'Diagnosis'}
                        fieldType={'string'}
                        isRequired={true}
                        errorField={errors.diagnosis}
                        touchedField={touched.description}
                        validation={() => ''}
                    />
                    <GenericInput
                        fieldTitle={t('Form.Diagnosis.Description')}
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
