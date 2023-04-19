import { CircularProgress, Heading, useToast, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { DiagnosisService } from '../../../services';
import { DiagnosisDto } from '../../../utils/dto';
import { SubmitButton } from '../../components/form';
import { BoxWithBorder } from '../../components/wrappers/BoxWithShadow';
import { DataDisplay } from '../../components/wrappers/DataDisplay';

export const DiagnosesDetailsPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <BoxWithBorder>
                    <VStack>
                        <Heading size={'lg'} sx={{ p: 2 }}>
                            {t('Form.DiagnosesDetails')}
                        </Heading>
                        <AnimalUpdateForm />
                    </VStack>
                </BoxWithBorder>
            }
        />
    );
};

const AnimalUpdateForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const recipe = useQuery({
        queryFn: async () => {
            const service = new DiagnosisService();
            return await service.get(params.id!);
        },
    });

    if (recipe.isLoading) {
        return <CircularProgress isIndeterminate />;
    }

    return (
        <Formik
            initialValues={recipe.data as DiagnosisDto}
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
    );
};
