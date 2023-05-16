import { PhoneIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Container,
    Heading,
    SimpleGrid,
    Skeleton,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    AnimalTag,
    CaseTypeTag,
    GenericHomePageTable,
    HealthRecordHeartRate,
} from '../../../components';
import { BoxWithShadowMax } from '../../../components/wrappers';
import { useUserContext } from '../../../providers/UserProvider';

import {
    diagnosesRoutePath,
    healthRecordsRoutePath,
    recipesRoutePath,
    resultsRoutePath,
} from '../../../router';
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

export const AdminHomePage = () => {
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

const PhoneTooltip = ({ id }: { id: string }) => {
    const healthRecordService = new HealthRecordService();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['phone' + id],
        queryFn: async () => {
            return await healthRecordService.getHealthRecordsContactInfo(id);
        },
    });

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <Skeleton isLoaded={!isLoading}>
                <Tooltip hasArrow label={data?.phoneNumber}>
                    <PhoneIcon />
                </Tooltip>
            </Skeleton>
        </Box>
    );
};

const HealthRecordTable = () => {
    const { t } = useTranslation();

    const adminHr = useQuery({
        queryKey: ['hr'],
        queryFn: async () => {
            const healthRecordService = new HealthRecordService();

            return await healthRecordService.list();
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
                cell: (info) => <PhoneTooltip id={info.cell.getValue()} />,
                header: t('Form.HealthRecord.Contact').toString(),
            }),
            healthRecordColumnHelper.accessor('id', {
                cell: (info) => (
                    <Link
                        to={healthRecordsRoutePath + `/rate/${info.getValue()}`}
                    >
                        <Button>{t('Table.Buttons.Rate')}</Button>
                    </Link>
                ),
                header: t('Form.HealthRecord.Rate').toString(),
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
            <Skeleton isLoaded={!adminHr.isLoading}>
                {adminHr.data && adminHr.data.length > 0 ? (
                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <GenericHomePageTable
                                entity={'healthrecord'}
                                data={adminHr.data}
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

const DiagnosesTable = () => {
    const { t } = useTranslation();
    const { state } = useUserContext();

    const diagnoses = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            const service = new DiagnosisService();
            return (await service.list()).reverse();
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
                    <Link
                        to={
                            diagnosesRoutePath +
                            '/createResult/' +
                            info.getValue()
                        }
                    >
                        <Button>{t('Table.Diagnoses.FormResult')}</Button>
                    </Link>
                ),
                header: t('Table.MedicineRecipes.Details').toString(),
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

    const columnsLower = () => {
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
            <Skeleton isLoaded={!diagnoses.isLoading}>
                {diagnoses.data && diagnoses.data.length > 0 ? (
                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <GenericHomePageTable
                                entity={'healthrecord'}
                                data={diagnoses.data}
                                columns={
                                    state.classification === 'Veterinarian'
                                        ? columns()
                                        : columnsLower()
                                }
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

    const recipes = useQuery({
        queryKey: ['recipes'],
        queryFn: async () => {
            const service = new RecipeService();
            return (await service.list()).reverse();
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
            <Skeleton isLoaded={!recipes.isLoading}>
                {recipes.data && recipes.data.length > 0 ? (
                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <GenericHomePageTable
                                entity={'recipe'}
                                data={recipes.data}
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
    const { state } = useUserContext();

    const results = useQuery({
        queryKey: ['results'],
        queryFn: async () => {
            const service = new ResultsService();
            return (await service.list()).reverse();
        },
    });
    const columnHelper = createColumnHelper<ResultDto>();
    const columnsHigher = () => {
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
                        to={
                            resultsRoutePath +
                            '/createRecipe/' +
                            info.getValue()
                        }
                    >
                        <Button>
                            {t('Table.DiagnosesResults.PrescribeMedicine')}
                        </Button>
                    </Link>
                ),
                header: t('Form.MedicineRecipe.Create').toString(),
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Link to={resultsRoutePath + '/' + info.getValue()}>
                        <Button>{t('Table.MedicineRecipes.Details')}</Button>
                    </Link>
                ),
                header: t('Table.MedicineRecipes.Details').toString(),
            }),
        ];
    };
    const columnsLower = () => {
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
                    <Link to={resultsRoutePath + '/' + info.getValue()}>
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
                    {t('Table.Headers.DiagnosesResults.Header')}
                </Text>
            </Box>
            <Skeleton isLoaded={!results.isLoading}>
                {results.data && results.data.length > 0 ? (
                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <GenericHomePageTable
                                entity={'result'}
                                data={results.data}
                                columns={
                                    state.classification === 'Veterinarian' ||
                                    state.role === 'Admin'
                                        ? columnsHigher()
                                        : columnsLower()
                                }
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
