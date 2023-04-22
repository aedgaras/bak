import { PhoneIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Container,
    Divider,
    Heading,
    SimpleGrid,
    Skeleton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
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
} from '../../../services';
import { formatedDate } from '../../../utils/utils';
import { CaseTypeTag } from '../../components/table';
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
    const { state } = useUserContext();
    const healthRecordService = new HealthRecordService();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['newestHealthRecords'],
        queryFn: async () => {
            return (await healthRecordService.list()).reverse();
        },
        cacheTime: 0,
    });

    return (
        <BoxWithShadowMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.HealthRecors.Header')}
                    </Text>
                </Box>
                <Divider />
                {data && data.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th>{t('Table.Headers.No')}</Th>
                                    <Th>
                                        {t('Table.Headers.HeartRate.HeartRate')}
                                    </Th>
                                    <Th>{t('Form.Diangosis.CaseDate')}</Th>

                                    <>
                                        <Th> {t('Form.PhoneNumber')}</Th>
                                        <Th />
                                    </>

                                    <Th />
                                </Tr>
                            </Thead>
                            <Divider />
                            <Tbody>
                                {data.map((x, i) => {
                                    return (
                                        <>
                                            <Tr>
                                                <Td>{x.id}</Td>
                                                <Td>{x.heartRate}</Td>
                                                <Td>
                                                    {formatedDate(x.entryDate)}
                                                </Td>
                                                <>
                                                    <Td>
                                                        <PhoneTooltip
                                                            id={x.id}
                                                        />
                                                    </Td>
                                                    <Td>
                                                        <Link
                                                            to={
                                                                healthRecordsRoutePath +
                                                                '/rate/' +
                                                                x.id
                                                            }
                                                        >
                                                            <Button>
                                                                {t(
                                                                    'Table.HealthRecors.Action.Rate'
                                                                )}
                                                            </Button>
                                                        </Link>
                                                    </Td>
                                                </>

                                                <Td>
                                                    <Link
                                                        to={
                                                            healthRecordsRoutePath +
                                                            '/' +
                                                            x.id
                                                        }
                                                    >
                                                        <Button>
                                                            {t(
                                                                'Table.HealthRecors.Action.Details'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        </>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
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
            </Box>
        </BoxWithShadowMax>
    );
};

const DiagnosesTable = () => {
    const { t } = useTranslation();
    const { state } = useUserContext();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            const service = new DiagnosisService();
            return (await service.list()).reverse();
        },
    });

    return (
        <BoxWithShadowMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>{t('Table.Headers.Diagnoses.Header')}</Text>
                </Box>
                <Divider />
                {data && data.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th>{t('Table.Headers.No')}</Th>
                                    <Th>{t('Form.Diagnosis.Type')}</Th>
                                    <Th />
                                    <Th />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((x, i) => {
                                    return (
                                        <>
                                            <Tr>
                                                <Td>{x.id}</Td>
                                                <Td>
                                                    <CaseTypeTag
                                                        label={x.caseType}
                                                    />
                                                </Td>

                                                <Td>
                                                    <Link
                                                        to={
                                                            diagnosesRoutePath +
                                                            '/createResult/' +
                                                            x.id
                                                        }
                                                    >
                                                        <Button>
                                                            {t(
                                                                'Table.Diagnoses.FormResult'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                </Td>

                                                <Td>
                                                    <Link
                                                        to={
                                                            diagnosesRoutePath +
                                                            '/' +
                                                            x.id
                                                        }
                                                    >
                                                        <Button>
                                                            {t(
                                                                'Table.HealthRecors.Details'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        </>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
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
            </Box>
        </BoxWithShadowMax>
    );
};

const MedicineRecipesTable = () => {
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['recipes'],
        queryFn: async () => {
            const service = new RecipeService();
            return (await service.list()).reverse();
        },
    });

    return (
        <BoxWithShadowMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.MedicineRecipes.Header')}
                    </Text>
                </Box>
                <Divider />
                {data && data.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th>{t('Table.Headers.No')}</Th>
                                    <Th>{t('Form.MedicineRecipe.Name')}</Th>
                                    <Th />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((x, i) => {
                                    return (
                                        <>
                                            <Tr>
                                                <Td>{x.id}</Td>
                                                <Td>{x.title}</Td>
                                                <Td>
                                                    <Link
                                                        to={
                                                            recipesRoutePath +
                                                            '/' +
                                                            x.id
                                                        }
                                                    >
                                                        <Button>
                                                            {t(
                                                                'Table.MedicineRecipes.Details'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        </>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
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
            </Box>
        </BoxWithShadowMax>
    );
};

const DiagnosesResultsTable = () => {
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            const service = new DiagnosisService();
            return (await service.list()).reverse();
        },
    });

    return (
        <BoxWithShadowMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.DiagnosesResults.Header')}
                    </Text>
                </Box>
                <Divider />
                {data && data.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th>{t('Table.Headers.No')}</Th>
                                    <Th>
                                        {t('Form.Diagnosis.Result.ResultType')}
                                    </Th>
                                    <Th />
                                    <Th />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((x, i) => {
                                    return (
                                        <>
                                            <Tr>
                                                <Td>{x.id}</Td>
                                                <Td>
                                                    <CaseTypeTag
                                                        label={x.caseType}
                                                    />
                                                </Td>
                                                <Td>
                                                    <Link
                                                        to={
                                                            diagnosesResultsRoutePath +
                                                            '/createRecipe/' +
                                                            x.id
                                                        }
                                                    >
                                                        <Button>
                                                            {t(
                                                                'Table.DiagnosesResults.PrescribeMedicine'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                </Td>
                                                <Td>
                                                    <Link
                                                        to={
                                                            diagnosesResultsRoutePath +
                                                            '/' +
                                                            x.id
                                                        }
                                                    >
                                                        <Button>
                                                            {t(
                                                                'Table.DiagnosesResults.Details'
                                                            )}
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        </>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
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
            </Box>
        </BoxWithShadowMax>
    );
};
