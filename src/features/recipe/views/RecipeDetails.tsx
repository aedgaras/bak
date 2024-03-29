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
import { RecipeService } from '../../../services';
import { UpdateRecipeDto } from '../../../types/dto';

export const RecipeDetails = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay>
            <FormWrapper>
                <Heading size={'lg'} sx={{ p: 2 }}>
                    {t('Form.RecipeDetails')}
                </Heading>
                <RecipeUpdateForm />
            </FormWrapper>
        </DataDisplay>
    );
};

const RecipeUpdateForm = () => {
    const count = [1, 2, 3, 4];
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const toast = useToast();
    const { t } = useTranslation();

    const recipe = useQuery({
        queryKey: ['recipeDetails' + params.id!],
        queryFn: async () => {
            const service = new RecipeService();
            return await service.get(params.id!);
        },
    });

    if (recipe.isLoading || !recipe.data) {
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
            initialValues={recipe.data as UpdateRecipeDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const dto: UpdateRecipeDto = {
                    caseId: recipe.data?.caseId!,
                    userId: recipe.data?.userId!,
                    title: values.title ?? recipe.data?.title,
                    count: values.count ?? recipe.data?.count,
                    description: values.description ?? recipe.data?.description,
                };
                const service = new RecipeService();

                service.update(recipe.data?.id.toString()!, dto).then(() => {
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
                        isInvalid={!!errors.title && touched.title}
                        p={2}
                        isRequired
                        isDisabled={state.classification !== 'Veterinarian'}
                    >
                        <FormLabel>{t('Form.MedicineRecipe.Name')}</FormLabel>
                        <Field
                            as={Input}
                            type="text"
                            name="title"
                            placeholder={recipe.data?.title}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.title}
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
                            placeholder={recipe.data?.description}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.description}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl
                        p={2}
                        isRequired
                        isDisabled={state.classification !== 'Veterinarian'}
                    >
                        <FormLabel>{t('Form.MedicineRecipe.Count')}</FormLabel>
                        <Field as={Select} name="count">
                            {count.map((key) => {
                                return <option value={key}>{key}</option>;
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
