import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Select,
    Skeleton,
    Text,
    useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { Field, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    GenericHomePageTable,
    GenericInput,
    HealthRecordHeartRate,
    SubmitButton,
} from '../../../components';
import { validateUsername } from '../../../components/form/validation/validation';
import {
    BoxWithShadowMax,
    DataDisplay,
    FormWrapper,
} from '../../../components/wrappers';
import { queryClient } from '../../../lib/query';
import { useUserContext } from '../../../providers/UserProvider';
import { healthRecordsRoutePath } from '../../../router';
import { AnimalService, HealthRecordService } from '../../../services';

import { HealthRecordDto, UpdateAnimalDto } from '../../../types';
import { AnimalValues, formatedDate } from '../../../utils/utils';

export const AnimalDetailsPage = () => {
    const toast = useToast();
    const { t } = useTranslation();

    return (
        <Box>
            <DataDisplay
                isLoaded={true}
                element={
                    <FormWrapper>
                        <Heading size={'lg'} sx={{ p: 2 }}>
                            {t('Form.AnimalDetails')}
                        </Heading>
                        <AnimalUpdateForm />
                    </FormWrapper>
                }
            />
            <Box pt={2}>
                <HealthRecordTable />
            </Box>
        </Box>
    );
};

const AnimalUpdateForm = () => {
    const { state } = useUserContext();
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const toast = useToast();
    const { t } = useTranslation();

    const animal = useQuery({
        queryKey: ['animal' + params.id!],
        queryFn: async () => {
            const service = new AnimalService();
            return await service.get(params.id!);
        },
    });

    if (animal.isLoading) {
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
            initialValues={animal.data as UpdateAnimalDto}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const service = new AnimalService();

                const dto: UpdateAnimalDto = {
                    type: parseInt(values.type.toString()),
                    name: values.name,
                };

                service.update(animal.data?.id!, dto).then(() => {
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
                    {animal.data ? (
                        <>
                            <GenericInput
                                fieldTitle={t('Form.Animal.Name')}
                                fieldName={'Name'}
                                fieldType={'string'}
                                isRequired={true}
                                errorField={errors.name}
                                touchedField={touched.name}
                                validation={validateUsername}
                            />

                            <FormControl
                                p={2}
                                isInvalid={!!errors.type && touched.type}
                            >
                                <FormLabel>{t('Form.Animal.Type')}</FormLabel>
                                <Field as={Select} name="type" required>
                                    {AnimalValues.map((key) => {
                                        return (
                                            <option value={key.value}>
                                                {t(`Enums.Animal.${key.key}`)}
                                            </option>
                                        );
                                    })}
                                </Field>
                                <FormErrorMessage>
                                    <FormErrorIcon />
                                    {errors.type}
                                </FormErrorMessage>
                            </FormControl>
                        </>
                    ) : (
                        <Skeleton />
                    )}
                    <SubmitButton
                        isSubmitting={isSubmitting || animal.isLoading}
                    />
                </form>
            )}
        </Formik>
    );
};

const HealthRecordTable = () => {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const params = useParams<{ id: string }>();
    const healthRecordService = new HealthRecordService();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['animalHealthRecords' + params.id!],
        queryFn: async () => {
            const res = await healthRecordService.getAnimalHealthRecords(
                params.id!
            );

            console.log(res);

            return res;
        },
    });
    const healthRecordColumnHelper = createColumnHelper<HealthRecordDto>();
    const healthRecordTableColumns = () => {
        return [
            healthRecordColumnHelper.accessor('heartRate', {
                cell: (info) => <HealthRecordHeartRate bpm={info.getValue()} />,
                header: t('Table.Headers.HeartRate.HeartRate').toString(),
            }),
            healthRecordColumnHelper.accessor('entryDate', {
                cell: (info) => formatedDate(info.getValue()),
                header: t('Form.Date').toString(),
            }),
            healthRecordColumnHelper.accessor('id', {
                cell: (info) => (
                    <Link
                        to={healthRecordsRoutePath + '/' + `${info.getValue()}`}
                    >
                        <Button>{t('Table.Buttons.Details')}</Button>
                    </Link>
                ),
                header: t('Table.MedicineRecipes.Details').toString(),
            }),
        ];
    };

    return (
        <BoxWithShadowMax>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Text as={'b'}>{t('Table.Headers.HealthRecors.Header')}</Text>
            </Box>
            <Skeleton isLoaded={!isLoading}>
                {data && data.length > 0 ? (
                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <GenericHomePageTable
                                entity={'healthrecord'}
                                data={data}
                                columns={healthRecordTableColumns()}
                                canDelete={false}
                            />
                        </Box>
                    </Box>
                ) : (
                    <Container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            py: 5,
                        }}
                    >
                        {t('Table.Info.NoNewData')}
                    </Container>
                )}
            </Skeleton>
        </BoxWithShadowMax>
    );
};
