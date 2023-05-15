import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    SimpleGrid,
    Skeleton,
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
import { RecipeService, ResultsService, UserService } from '../../../services';
import { CreateRecipeDto } from '../../../utils/dto';
import { GenericInput, SubmitButton } from '../../components/form';
import {
    validateRecipe,
    validateRecipeDescriptiom,
} from '../../components/form/validation/validation';
import { BoxWithShadow } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const RecipeCreatePage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Pages.RecipeCreate');
    }, []);

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <BoxWithShadow>
                    <VStack px={12}>
                        <Heading size={'lg'} sx={{ p: 2 }}>
                            {t('Form.MedicineRecipe.Create')}
                        </Heading>
                        <RecipeCreationForm />
                    </VStack>
                </BoxWithShadow>
            }
        />
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
        enabled: !!result.data,
    });

    const caseObj = useQuery({
        queryKey: ['caseRecipe' + params.resultId!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.getCase(params.resultId!);
        },
        enabled: !!animal.data,
    });

    const user = useQuery({
        queryKey: ['recipeUser' + params.resultId!],
        queryFn: async () => {
            const userService = new UserService();

            if (animal.data) {
                return await userService.getUserById(
                    animal?.data?.userId?.toString()
                );
            }
        },
        enabled: !!animal.data,
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
                    <SimpleGrid columns={[1, 2, 3, 3]}>
                        {!result.isLoading &&
                        !caseObj.isLoading &&
                        !animal.isLoading &&
                        !user.isLoading ? (
                            <Box>
                                <FormControl p={2} isRequired>
                                    <FormLabel>
                                        {t('Form.MedicineRecipe.User')}
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        disabled
                                        value={user.data?.username}
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
                                            result.data?.caseDiagnosis
                                                ?.diagnosis
                                        }
                                    ></Field>
                                </FormControl>
                                <FormControl p={2}>
                                    <FormLabel>
                                        {t(
                                            'Form.MedicineRecipe.DiagnosisResults'
                                        )}
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        disabled
                                        value={result.data?.result}
                                    ></Field>
                                </FormControl>
                            </Box>
                        ) : (
                            <Skeleton></Skeleton>
                        )}
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
                                textArea={true}
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
                                validation={() => ''}
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
                    <SubmitButton
                        isSubmitting={
                            isSubmitting ||
                            result.isLoading ||
                            caseObj.isLoading ||
                            animal.isLoading
                        }
                    />
                </form>
            )}
        </Formik>
    );
};
