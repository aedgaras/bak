import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getHealthRecordsList } from '../../../services/Requests';
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

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['healthRecordList'],
        queryFn: async () => {
            return await getHealthRecordsList();
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
