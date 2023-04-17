import {
    Box,
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
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { RecipeService, ResultsService } from '../../../services';
import { CreateRecipeDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import {
    validatePassword,
    validateRecipe,
    validateRecipeDescriptiom,
} from '../../components/form/validation/validation';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const RecipeCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <BoxWithShadow>
                        <VStack>
                            <Heading size={'lg'} sx={{ p: 2 }}>
                                {t('Form.MedicineRecipe.Create')}
                            </Heading>
                            <RecipeCreationForm />
                        </VStack>
                    </BoxWithShadow>
                }
            />
        </AppWrapper>
    );
};

const RecipeCreationForm = () => {
    const { state } = useUserContext();
    const count = [1, 2, 3, 4];

    const params = useParams<{ resultId: string }>();
    const navigate = useNavigate();

    const result = useQuery({
        queryKey: ['resultRecipe' + params.resultId!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.get(params.resultId!);
        },
    });

    const animal = useQuery({
        queryKey: ['animalRecipe' + params.resultId!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.getAnimal(params.resultId!);
        },
    });

    const caseObj = useQuery({
        queryKey: ['caseRecipe' + params.resultId!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.getCase(params.resultId!);
        },
    });

    return (
        <Formik
            initialValues={{} as CreateRecipeDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);

                const service = new RecipeService();
                values = {
                    ...values,
                    count: !values.count
                        ? 1
                        : parseInt(values.count.toString()),
                    caseId: parseInt(caseObj.data?.id!),
                    userId: parseInt(state.userId!.toString()),
                };

                await service.add(values).then(() => {
                    navigate(-1);
                });
            }}
        >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <SimpleGrid columns={[1, null, null, 3]}>
                        <Box>
                            <FormControl p={2} isRequired>
                                <FormLabel>
                                    {t('Form.MedicineRecipe.User')}
                                </FormLabel>
                                <Field
                                    as={Input}
                                    disabled
                                    value={result.data?.userId}
                                ></Field>
                            </FormControl>
                            <FormControl p={2}>
                                <FormLabel>
                                    {t('Form.MedicineRecipe.Animal')}
                                </FormLabel>
                                <Field
                                    as={Input}
                                    disabled
                                    value={animal.data?.name}
                                ></Field>
                            </FormControl>
                            <FormControl p={2}>
                                <FormLabel>
                                    {t('Form.MedicineRecipe.Diagnosis')}
                                </FormLabel>
                                <Field
                                    as={Input}
                                    disabled
                                    value={
                                        result.data?.caseDiagnosis?.diagnosis
                                    }
                                ></Field>
                            </FormControl>
                            <FormControl p={2}>
                                <FormLabel>
                                    {t('Form.MedicineRecipe.DiagnosisResults')}
                                </FormLabel>
                                <Field
                                    as={Input}
                                    disabled
                                    value={result.data?.result}
                                ></Field>
                            </FormControl>
                        </Box>
                        <Box>
                            <GenericInput
                                fieldTitle={t('Form.MedicineRecipe.Name')}
                                fieldName={'Title'}
                                fieldType={'string'}
                                isRequired={true}
                                errorField={errors.title}
                                touchedField={touched.title}
                                validation={validateRecipe}
                            />
                            <GenericInput
                                fieldTitle={t(
                                    'Form.MedicineRecipe.Description'
                                )}
                                fieldName={'Description'}
                                fieldType={'string'}
                                isRequired={true}
                                errorField={errors.description}
                                touchedField={touched.description}
                                validation={validateRecipeDescriptiom}
                            />
                        </Box>

                        <Box>
                            <GenericInput
                                fieldTitle={t('Form.MedicineRecipe.DateDue')}
                                fieldName={'ExpiryTime'}
                                fieldType={'date'}
                                isRequired={true}
                                errorField={errors.expiryTime?.toString()}
                                touchedField={touched.expiryTime}
                                validation={validatePassword}
                            />

                            <FormControl p={2} isRequired>
                                <FormLabel>
                                    {t('Form.MedicineRecipe.Count')}
                                </FormLabel>
                                <Field as={Select} name="count">
                                    {count.map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        );
                                    })}
                                </Field>
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                    <Flex justifyContent={'center'}>
                        <SubmitButton isSubmitting={isSubmitting} />
                    </Flex>
                </form>
            )}
        </Formik>
    );
};