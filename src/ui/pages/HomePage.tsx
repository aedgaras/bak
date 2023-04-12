import {
    Box,
    Divider,
    Heading,
    SimpleGrid,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tr,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../context/UserContext';
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
                <SimpleGrid columns={2} gap={4}>
                    <BoxWithBorderMax>
                        <HealthRecordTable />
                    </BoxWithBorderMax>
                    <BoxWithBorderMax>
                        <HealthRecordTable />
                    </BoxWithBorderMax>
                    <BoxWithBorderMax>
                        <HealthRecordTable />
                    </BoxWithBorderMax>
                    <BoxWithBorderMax>
                        <HealthRecordTable />
                    </BoxWithBorderMax>
                </SimpleGrid>
            </BoxWithShadowMax>
        </AppWrapper>
    );
};

export const HealthRecordTable = () => {
    const { t } = useTranslation();
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Text as={'b'}>{t('Table.Headers.HealthRecors.Header')}</Text>
            </Box>
            <Divider />
            <TableContainer>
                <Table variant="simple">
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};
