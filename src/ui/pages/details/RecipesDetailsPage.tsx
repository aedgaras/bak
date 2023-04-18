import { Heading, Skeleton, useToast, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { RecipeService } from '../../../services';
import { MedicineRecipeDto } from '../../../utils/dto';
import { SubmitButton } from '../../components/form';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithBorder } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const RecipesDetailsPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <AppWrapper>
            <DataDisplay
                isLoaded={true}
                element={
                    <BoxWithBorder>
                        <VStack>
                            <Heading size={'lg'} sx={{ p: 2 }}>
                                {t('Form.RecipeDetails')}
                            </Heading>
                            <AnimalUpdateForm />
                        </VStack>
                    </BoxWithBorder>
                }
            />
        </AppWrapper>
    );
};

const AnimalUpdateForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const recipe = useQuery({
        queryFn: async () => {
            const service = new RecipeService();
            return await service.get(params.id!);
        },
    });

    return (
        <Skeleton isLoaded={!recipe.isLoading}>
            <Formik
                initialValues={recipe.data as MedicineRecipeDto}
                onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    // const dto: UpdateAnimalDto = {
                    //     type: parseInt(values.type.toString()),
                    //     name: values.name,
                    // };

                    // service.update(recipe.data?.id!, dto).then(() => {
                    //     navigate(-1);
                    // });
                }}
            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <SubmitButton isSubmitting={isSubmitting} />
                    </form>
                )}
            </Formik>
        </Skeleton>
    );
};
