import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HealthRecordService } from '../../../services';
import { HealthRecordDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterHeartRatesTable,
    healthRecordTableColumns,
} from '../../components/table/Helpers';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const HealthRecordsPage = () => {
    const [healthRecords, setHealthRecords] = useState<HealthRecordDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['healthRecordList'],
        queryFn: async () => {
            const healthRecordService = new HealthRecordService();
            return await healthRecordService.getHealthRecordsList();
        },
    });

    useEffect(() => {
        if (data) {
            filterHeartRatesTable(data, queryFilter, setHealthRecords);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <AppWrapper>
            <Skeleton isLoaded={!isLoading}>
                <GenericTableWithSearchAndCreate<HealthRecordDto>
                    title={t('Table.Title.HealthRecords')}
                    entity={'healthrecord'}
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={healthRecords}
                    columns={healthRecordTableColumns()}
                    refreshData={setRefreshFlag}
                />
            </Skeleton>
        </AppWrapper>
    );
};
