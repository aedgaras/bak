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
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { DataDisplay, FormWrapper } from '../../../components/wrappers';
import { useUserContext } from '../../../providers/UserProvider';
import { ResultsService } from '../../../services';
import { ResultDto } from '../../../types/dto';
import { formatedDate } from '../../../utils/utils';

export const ResultDetails = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <DataDisplay
            isLoaded={true}
            element={
                <FormWrapper>
                    <Heading size={'lg'} sx={{ p: 2 }}>
                        {t('Form.DiagnosesResultsDetails')}
                    </Heading>
                    <AnimalUpdateForm />
                </FormWrapper>
            }
        />
    );
};

const AnimalUpdateForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const recipe = useQuery({
        queryKey: ['result' + params.id!],
        queryFn: async () => {
            const service = new ResultsService();
            return await service.get(params.id!);
        },
    });

    if (recipe.isLoading) {
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
            initialValues={recipe.data as ResultDto}
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
                    <FormControl
                        isInvalid={!!errors.result && touched.result}
                        p={2}
                        isRequired
                        isDisabled={
                            state.classification !== 'Veterinarian' &&
                            state.role !== 'Admin'
                        }
                    >
                        <FormLabel>{t('Form.Diagnosis.Diagnosis')}</FormLabel>
                        <Field
                            as={Input}
                            type="text"
                            name="result"
                            placeholder={recipe.data?.result}
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
                        isDisabled={
                            state.classification !== 'Veterinarian' &&
                            state.role !== 'Admin'
                        }
                    >
                        <FormLabel>
                            {t('Form.HealthRecord.Description')}
                        </FormLabel>
                        <Field
                            as={Textarea}
                            type="text"
                            name="description"
                            placeholder={new Date(recipe.data?.description!)}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.description}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isInvalid={!!errors.entryDate && touched.entryDate}
                        p={2}
                        isRequired
                        isDisabled={
                            state.classification !== 'Veterinarian' &&
                            state.role !== 'Admin'
                        }
                    >
                        <FormLabel>{t('Form.Date')}</FormLabel>

                        <Field
                            as={Input}
                            type="text"
                            name="entryDate"
                            placeholder={formatedDate(recipe.data?.entryDate!)}
                            value={formatedDate(recipe.data?.entryDate!)}
                        />

                        <FormErrorMessage>
                            <FormErrorIcon />
                            {errors.entryDate}
                        </FormErrorMessage>
                    </FormControl>

                    <Center p={2}>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            isDisabled={
                                state.classification !== 'Veterinarian' &&
                                state.role !== 'Admin'
                            }
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
