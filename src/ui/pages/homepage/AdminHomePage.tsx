import { PhoneIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Container,
    Divider,
    Heading,
    SimpleGrid,
    Skeleton,
    Td,
    Text,
    Tooltip,
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
import { formatedDate, getAnimalType } from '../../../utils/utils';
import { CaseTypeTag, GenericHomePageTable } from '../../components/table';
import { BoxWithShadowMax } from '../../components/wrappers/BoxWithShadow';

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
                <MedicineRecipesTable />
                <DiagnosesResultsTable />
            </SimpleGrid>
        </BoxWithShadowMax>
    );
};

const PhoneTooltip = ({ id }: { id: string }) => {
    const healthRecordService = new HealthRecordService();

    const { isLoading, isFetching, error, data } = useQuery({
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
            healthRecordColumnHelper.accessor('id', {
                cell: (info) => info.getValue(),
                header: 'Id',
            }),
            healthRecordColumnHelper.accessor('heartRate', {
                cell: (info) => info.getValue(),
                header: t('Table.Headers.HeartRate.HeartRate').toString(),
            }),
            healthRecordColumnHelper.accessor('animal.type', {
                cell: (info) => getAnimalType(info.getValue()),
                header: t('Form.Animal.Type').toString(),
            }),
            healthRecordColumnHelper.accessor('entryDate', {
                cell: (info) => formatedDate(info.getValue()),
                header: t('Form.Diangosis.CaseDate').toString(),
            }),
            healthRecordColumnHelper.accessor('id', {
                cell: (info) => (
                    <Td key={info.getValue() + '_details'}>
                        <Link
                            to={
                                healthRecordsRoutePath +
                                `/rate/${info.getValue()}`
                            }
                        >
                            <Button>{t('Table.Buttons.Rate')}</Button>
                        </Link>
                    </Td>
                ),
                header: 'Ivertinimas',
            }),
            healthRecordColumnHelper.accessor('id', {
                cell: (info) => (
                    <Td key={info.getValue() + '_details'}>
                        <Link
                            to={
                                healthRecordsRoutePath +
                                '/' +
                                `${info.getValue()}`
                            }
                        >
                            <Button>{t('Table.Buttons.Details')}</Button>
                        </Link>
                    </Td>
                ),
                header: 'Details',
            }),
        ];
    };

    if (!adminHr.data) {
        return <Skeleton isLoaded={false}></Skeleton>;
    }

    return (
        <BoxWithShadowMax>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Text as={'b'}>{t('Table.Headers.HealthRecors.Header')}</Text>
            </Box>
            {adminHr.data.length > 0 ? (
                <Box padding={2}>
                    <Box borderWidth="1px" borderRadius="lg" padding={2}>
                        <GenericHomePageTable
                            entity={'healthrecord'}
                            data={adminHr.data}
                            columns={healthRecordTableColumns()}
                            canDelete={true}
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
            columnHelper.accessor('id', {
                cell: (info) => info.getValue(),
                header: 'Id',
            }),
            columnHelper.accessor('caseType', {
                cell: (info) => (
                    <Td>
                        <CaseTypeTag label={info.cell.getValue()} />
                    </Td>
                ),
                header: 'casetype',
            }),
            columnHelper.accessor('diagnosis', {
                cell: (info) => info.getValue(),
                header: t('Form.Diangosis.CaseDate').toString(),
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Td>
                        <Link
                            to={
                                diagnosesRoutePath +
                                '/createResult/' +
                                info.getValue()
                            }
                        >
                            <Button>{t('Table.Diagnoses.FormResult')}</Button>
                        </Link>
                    </Td>
                ),
                header: 'Details',
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Td key={info.getValue() + '_details'}>
                        <Link
                            to={diagnosesRoutePath + '/' + `${info.getValue()}`}
                        >
                            <Button>{t('Table.Buttons.Details')}</Button>
                        </Link>
                    </Td>
                ),
                header: 'Details',
            }),
        ];
    };

    if (!diagnoses.data) {
        return <Skeleton isLoaded={false}></Skeleton>;
    }

    return (
        <BoxWithShadowMax>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Text as={'b'}>{t('Table.Headers.Diagnoses.Header')}</Text>
            </Box>
            {diagnoses.data.length > 0 ? (
                <Box padding={2}>
                    <Box borderWidth="1px" borderRadius="lg" padding={2}>
                        <GenericHomePageTable
                            entity={'healthrecord'}
                            data={diagnoses.data}
                            columns={columns()}
                            canDelete={true}
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
            columnHelper.accessor('id', {
                cell: (info) => info.getValue(),
                header: 'Id',
            }),
            columnHelper.accessor('title', {
                cell: (info) => info.getValue(),
                header: t('Form.MedicineRecipe.Name').toString(),
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Td>
                        <Link to={recipesRoutePath + '/' + info.getValue()}>
                            <Button>
                                {t('Table.MedicineRecipes.Details')}
                            </Button>
                        </Link>
                    </Td>
                ),
                header: t('Table.MedicineRecipes.Details').toString(),
            }),
        ];
    };

    if (!recipes.data) {
        return <Skeleton isLoaded={false}></Skeleton>;
    }

    return (
        <BoxWithShadowMax>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Text as={'b'}>
                    {t('Table.Headers.MedicineRecipes.Header')}
                </Text>
            </Box>
            {recipes.data.length > 0 ? (
                <Box padding={2}>
                    <Box borderWidth="1px" borderRadius="lg" padding={2}>
                        <GenericHomePageTable
                            entity={'recipe'}
                            data={recipes.data}
                            columns={columns()}
                            canDelete={true}
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
        </BoxWithShadowMax>
    );
};

const DiagnosesResultsTable = () => {
    const { t } = useTranslation();

    const results = useQuery({
        queryKey: ['results'],
        queryFn: async () => {
            const service = new ResultsService();
            return (await service.list()).reverse();
        },
    });
    const columnHelper = createColumnHelper<ResultDto>();
    const columns = () => {
        return [
            columnHelper.accessor('id', {
                cell: (info) => info.getValue(),
                header: 'Id',
            }),
            columnHelper.accessor('caseType', {
                cell: (info) => (
                    <CaseTypeTag label={info.getValue()}></CaseTypeTag>
                ),
                header: t('Form.Diagnosis.Result.ResultType').toString(),
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Link
                        to={
                            diagnosesResultsRoutePath +
                            '/createRecipe/' +
                            info.getValue()
                        }
                    >
                        <Button>
                            {t('Table.DiagnosesResults.PrescribeMedicine')}
                        </Button>
                    </Link>
                ),
                header: 'Kurimas',
            }),
            columnHelper.accessor('id', {
                cell: (info) => (
                    <Td>
                        <Link
                            to={
                                diagnosesResultsRoutePath +
                                '/' +
                                info.getValue()
                            }
                        >
                            <Button>
                                {t('Table.MedicineRecipes.Details')}
                            </Button>
                        </Link>
                    </Td>
                ),
                header: t('Table.MedicineRecipes.Details').toString(),
            }),
        ];
    };

    if (!results.data) {
        return <Skeleton isLoaded={false}></Skeleton>;
    }

    return (
        <BoxWithShadowMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.DiagnosesResults.Header')}
                    </Text>
                </Box>
                <Divider />
                {results.data.length > 0 ? (
                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <GenericHomePageTable
                                entity={'recipe'}
                                data={results.data}
                                columns={columns()}
                                canDelete={true}
                            />
                        </Box>
                    </Box>
                ) : (
                    // <TableContainer>
                    //     <Table variant="simple" size="md">
                    //         <Thead>
                    //             <Tr>
                    //                 <Th>{t('Table.Headers.No')}</Th>
                    //                 <Th>
                    //                     {t('Form.Diagnosis.Result.ResultType')}
                    //                 </Th>
                    //                 <Th />
                    //                 <Th />
                    //             </Tr>
                    //         </Thead>
                    //         <Tbody>
                    //             {data.map((x, i) => {
                    //                 return (
                    //                     <>
                    //                         <Tr>
                    //                             <Td>{x.id}</Td>
                    //                             <Td>
                    //                                 <CaseTypeTag
                    //                                     label={x.caseType}
                    //                                 />
                    //                             </Td>
                    //                             <Td>
                    //                                 <Link
                    //                                     to={
                    //                                         diagnosesResultsRoutePath +
                    //                                         '/createRecipe/' +
                    //                                         x.id
                    //                                     }
                    //                                 >
                    //                                     <Button>
                    //                                         {t(
                    //                                             'Table.DiagnosesResults.PrescribeMedicine'
                    //                                         )}
                    //                                     </Button>
                    //                                 </Link>
                    //                             </Td>
                    //                             <Td>
                    //                                 <Link
                    //                                     to={
                    //                                         diagnosesResultsRoutePath +
                    //                                         '/' +
                    //                                         x.id
                    //                                     }
                    //                                 >
                    //                                     <Button>
                    //                                         {t(
                    //                                             'Table.DiagnosesResults.Details'
                    //                                         )}
                    //                                     </Button>
                    //                                 </Link>
                    //                             </Td>
                    //                         </Tr>
                    //                     </>
                    //                 );
                    //             })}
                    //         </Tbody>
                    //     </Table>
                    // </TableContainer>
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
            </Box>
        </BoxWithShadowMax>
    );
};
