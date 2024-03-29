import {
    Box,
    CircularProgress,
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
import { GenericInput, SubmitButton } from '../../../components';
import {
    validateRecipe,
    validateRecipeDescriptiom,
} from '../../../components/form/validation/validation';
import { BoxWithShadow, DataDisplay } from '../../../components/wrappers';
import { queryClient } from '../../../lib/query';
import { useUserContext } from '../../../providers/UserProvider';
import { RecipeService, ResultsService, UserService } from '../../../services';
import { CreateRecipeDto } from '../../../types/dto';

export const RecipeCreate = () => {
    const toast = useToast();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Pages.RecipeCreate');
    }, []);

    return (
        <DataDisplay>
            <BoxWithShadow>
                <VStack px={12}>
                    <Heading size={'lg'} sx={{ p: 2 }}>
                        {t('Form.MedicineRecipe.Create')}
                    </Heading>
                    <RecipeCreationForm />
                </VStack>
            </BoxWithShadow>
        </DataDisplay>
    );
};

const RecipeCreationForm = () => {
    const { state } = useUserContext();
    const count = [1, 2, 3, 4];
    const params = useParams<{ resultId: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useTranslation();

    const result = useQuery({
        queryKey: ['recipeCreationResult' + params.resultId!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.get(params.resultId!);
        },
    });

    const animal = useQuery({
        queryKey: ['recipeCreationAnimal' + params.resultId!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.getAnimal(params.resultId!);
        },
        enabled: !result.isLoading,
    });

    const caseObj = useQuery({
        queryKey: ['recipeCreationCase' + params.resultId!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.getCase(params.resultId!);
        },
        enabled: !animal.isLoading,
    });

    const user = useQuery({
        queryKey: ['recipeCreationUser' + params.resultId!],
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
