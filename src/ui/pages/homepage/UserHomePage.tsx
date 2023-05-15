import {
    Box,
    Button,
    Container,
    Heading,
    SimpleGrid,
    Skeleton,
    Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import {
    diagnosesResultsRoutePath,
    diagnosesRoutePath,
    healthRecordsRoutePath,
    recipesRoutePath,
} from '../../../router/AppRouter';
import {
    DiagnosisService,
    HealthRecordService,
    RecipeService,
    ResultsService,
} from '../../../services';
import {
    DiagnosisDto,
    HealthRecordDto,
    MedicineRecipeDto,
    ResultDto,
} from '../../../utils/dto';
import { formatedDate } from '../../../utils/utils';
import {
    AnimalTag,
    CaseTypeTag,
    GenericHomePageTable,
    HealthRecordHeartRate,
} from '../../components/table';
import { BoxWithShadowMax } from '../../components/wrappers/BoxWithShadow';

export const UserHomePage = () => {
    const { state } = useUserContext();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('Pages.HomePage');
    }, [state.name]);

    return (
        <BoxWithShadowMax>
            <Heading
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 4,
                    pb: 8,
                }}
            >
                {t('Page.HomePage.Title')}
            </Heading>
            <SimpleGrid columns={[1, null, null, 2]} gap={4}>
                <HealthRecordTable />
                <DiagnosesTable />
                <DiagnosesResultsTable />
                <MedicineRecipesTable />
            </SimpleGrid>
        </BoxWithShadowMax>
    );
};

const HealthRecordTable = () => {
    const { t } = useTranslation();
    const { state } = useUserContext();
    const healthRecordService = new HealthRecordService();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['newestHealthRecords'],
        queryFn: async () => {
            return (
                await healthRecordService.getUserHealthRecords(
                    state.userId!.toString()
                )
            ).reverse();
        },
    });
    const healthRecordColumnHelper = createColumnHelper<HealthRecordDto>();
    const healthRecordTableColumns = () => {
        return [
            healthRecordColumnHelper.accessor('heartRate', {
                cell: (info) => <HealthRecordHeartRate bpm={info.getValue()} />,
                header: t('Table.Headers.HeartRate.HeartRate').toString(),
            }),
            healthRecordColumnHelper.accessor('animal.type', {
                cell: (info) => <AnimalTag animalType={info.getValue()} />,
                header: t('Form.Animal.Type').toString(),
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
        <>
            <BoxWithShadowMax>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.HealthRecors.Header')}
                    </Text>
                </Box>
                <Skeleton isLoaded={!isLoading}>
                    {data && data.length > 0 ? (
                        <Box padding={2}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                padding={2}
                            >
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
        </>
    );
};

const DiagnosesTable = () => {
    const { t } = useTranslation();
    const { state } = useUserContext();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            const service = new DiagnosisService();
            return (
                await service.getUserDiagnoses(state.userId!.toString())
            ).reverse();
        },
    });

    const columnHelper = createColumnHelper<DiagnosisDto>();
    const columns = () => {
        return [
            columnHelper.accessor('caseType', {
                cell: (info) => <CaseTypeTag label={info.cell.getValue()} />,
                header: t('Form.Diangosis.Status').toString(),
            }),
            columnHelper.accessor('diagnosis', {
                cell: (info) => info.getValue(),
                header: t('Form.Diagnosis.Diangosis').toString(),
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Link to={diagnosesRoutePath + '/' + `${info.getValue()}`}>
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
                <Text as={'b'}>{t('Table.Headers.Diagnoses.Header')}</Text>
            </Box>
            <Skeleton isLoaded={!isLoading}>
                {data && data.length > 0 ? (
                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <GenericHomePageTable
                                entity={'healthrecord'}
                                data={data}
                                columns={columns()}
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

const MedicineRecipesTable = () => {
    const { t } = useTranslation();
    const { state } = useUserContext();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['recipes'],
        queryFn: async () => {
            const service = new RecipeService();
            return (
                await service.getUserRecipes(state.userId!.toString())
            ).reverse();
        },
    });

    const columnHelper = createColumnHelper<MedicineRecipeDto>();
    const columns = () => {
        return [
            columnHelper.accessor('title', {
                cell: (info) => info.getValue(),
                header: t('Form.MedicineRecipe.Name').toString(),
            }),
            columnHelper.accessor('entryDate', {
                cell: (info) => formatedDate(info.getValue()),
                header: t('Form.Date').toString(),
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Link to={recipesRoutePath + '/' + info.getValue()}>
                        <Button>{t('Table.MedicineRecipes.Details')}</Button>
                    </Link>
                ),
                header: t('Table.MedicineRecipes.Details').toString(),
            }),
        ];
    };

    return (
        <BoxWithShadowMax>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Text as={'b'}>
                    {t('Table.Headers.MedicineRecipes.Header')}
                </Text>
            </Box>
            <Skeleton isLoaded={!isLoading}>
                {data && data.length > 0 ? (
                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <GenericHomePageTable
                                entity={'recipe'}
                                data={data}
                                columns={columns()}
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

const DiagnosesResultsTable = () => {
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['results'],
        queryFn: async () => {
            const service = new ResultsService();
            return (await service.list()).reverse();
        },
    });
    const columnHelper = createColumnHelper<ResultDto>();
    const columns = () => {
        return [
            columnHelper.accessor('caseType', {
                cell: (info) => (
                    <CaseTypeTag label={info.getValue()}></CaseTypeTag>
                ),
                header: t('Form.Diagnosis.Result.ResultType').toString(),
            }),
            columnHelper.accessor('entryDate', {
                cell: (info) => formatedDate(info.getValue()),
                header: t('Form.Date').toString(),
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Link
                        to={diagnosesResultsRoutePath + '/' + info.getValue()}
                    >
                        <Button>{t('Table.MedicineRecipes.Details')}</Button>
                    </Link>
                ),
                header: t('Table.MedicineRecipes.Details').toString(),
            }),
        ];
    };

    return (
        <BoxWithShadowMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.DiagnosesResults.Header')}
                    </Text>
                </Box>
                <Skeleton isLoaded={!isLoading}>
                    {data && data.length > 0 ? (
                        <Box padding={2}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                padding={2}
                            >
                                <GenericHomePageTable
                                    entity={'recipe'}
                                    data={data}
                                    columns={columns()}
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
            </Box>
        </BoxWithShadowMax>
    );
};
