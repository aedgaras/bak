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
    Tooltip,
    Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { healthRecordsRoutePath } from '../../router/AppRouter';
import {
    DiagnosisService,
    HealthRecordService,
    RecipeService,
} from '../../services';
import { getCaseType } from '../../utils/utils';
import { AppWrapper } from '../components/wrappers/AppWrapper';
import {
    BoxWithBorderMax,
    BoxWithShadowMax,
} from '../components/wrappers/BoxWithShadow';

export const HomePage = () => {
    const { state } = useUserContext();
    const { t } = useTranslation();

    return (
        <AppWrapper>
            <BoxWithShadowMax>
                <Heading
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 1,
                        pb: 3,
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
        </AppWrapper>
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
        <Skeleton isLoaded={!isLoading}>
            <Tooltip hasArrow label={data?.phoneNumber}>
                <PhoneIcon />
            </Tooltip>
        </Skeleton>
    );
};

const HealthRecordTable = () => {
    const { t } = useTranslation();
    const healthRecordService = new HealthRecordService();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['newestHealthRecords'],
        queryFn: async () => {
            return await healthRecordService.getHealthRecordsList();
        },
    });

    return (
        <BoxWithBorderMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.HealthRecors.Header')}
                    </Text>
                </Box>
                <Divider />
                {data && data.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple">
                            <Tbody>
                                {data.map((x) => {
                                    return (
                                        <Tr>
                                            <Td>{x.id}</Td>
                                            <Td>{x.heartRate}</Td>
                                            <Td>
                                                <PhoneTooltip id={x.id} />
                                            </Td>
                                            <Td>
                                                <Link
                                                    to={healthRecordsRoutePath}
                                                >
                                                    <Button>
                                                        {t(
                                                            'Table.HealthRecors.Action.Rate'
                                                        )}
                                                    </Button>
                                                </Link>
                                            </Td>
                                            <Td>
                                                <Link
                                                    to={healthRecordsRoutePath}
                                                >
                                                    <Button>
                                                        {t(
                                                            'Table.HealthRecors.Action.Details'
                                                        )}
                                                    </Button>
                                                </Link>
                                            </Td>
                                        </Tr>
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
        </BoxWithBorderMax>
    );
};

const DiagnosesTable = () => {
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            const service = new DiagnosisService();
            return await service.getDiagnosisList();
        },
    });

    return (
        <BoxWithBorderMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>{t('Table.Headers.Diagnoses.Header')}</Text>
                </Box>
                <Divider />
                {data && data.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple">
                            <Tbody>
                                {data.map((x) => {
                                    return (
                                        <Tr>
                                            <Td>{x.id}</Td>
                                            <Td>{getCaseType(x.caseType)}</Td>
                                            <Td>
                                                <Link
                                                    to={healthRecordsRoutePath}
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
                                                    to={healthRecordsRoutePath}
                                                >
                                                    <Button>
                                                        {t(
                                                            'Table.HealthRecors.Details'
                                                        )}
                                                    </Button>
                                                </Link>
                                            </Td>
                                        </Tr>
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
        </BoxWithBorderMax>
    );
};

const MedicineRecipesTable = () => {
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['recipes'],
        queryFn: async () => {
            const service = new RecipeService();
            return await service.getRecipesList();
        },
    });

    return (
        <BoxWithBorderMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.MedicineRecipes.Header')}
                    </Text>
                </Box>
                <Divider />
                {data && data.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple">
                            <Tbody>
                                {data.map((x) => {
                                    return (
                                        <Tr>
                                            <Td>{x.id}</Td>
                                            <Td>{x.title}</Td>
                                            <Td>
                                                <Tooltip
                                                    hasArrow
                                                    label={'number'}
                                                >
                                                    <PhoneIcon />
                                                </Tooltip>
                                            </Td>
                                            <Td>
                                                <Link
                                                    to={healthRecordsRoutePath}
                                                >
                                                    <Button>
                                                        {t(
                                                            'Table.MedicineRecipes.Details'
                                                        )}
                                                    </Button>
                                                </Link>
                                            </Td>
                                        </Tr>
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
        </BoxWithBorderMax>
    );
};

const DiagnosesResultsTable = () => {
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            const service = new DiagnosisService();
            return await service.getDiagnosisList();
        },
    });

    return (
        <BoxWithBorderMax>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                    <Text as={'b'}>
                        {t('Table.Headers.DiagnosesResults.Header')}
                    </Text>
                </Box>
                <Divider />
                {data && data.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple">
                            <Tbody>
                                {data.map((x) => {
                                    return (
                                        <Tr>
                                            <Td>{x.id}</Td>
                                            <Td>{getCaseType(x.caseType)}</Td>
                                            <Td>
                                                <Tooltip
                                                    hasArrow
                                                    label={'number'}
                                                >
                                                    <PhoneIcon />
                                                </Tooltip>
                                            </Td>
                                            <Td>
                                                <Link
                                                    to={healthRecordsRoutePath}
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
                                                    to={healthRecordsRoutePath}
                                                >
                                                    <Button>
                                                        {t(
                                                            'Table.DiagnosesResults.Details'
                                                        )}
                                                    </Button>
                                                </Link>
                                            </Td>
                                        </Tr>
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
        </BoxWithBorderMax>
    );
};
