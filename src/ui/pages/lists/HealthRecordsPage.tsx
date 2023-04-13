import { Button, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={healthRecords}
                    columns={healthRecordTableColumns()}
                    refreshData={setRefreshFlag}
                    createButton={
                        <Link to="create">
                            <Button color="teal">Create Case</Button>
                        </Link>
                    }
                />
            </Skeleton>
        </AppWrapper>
    );
};
