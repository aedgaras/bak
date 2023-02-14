import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getOrganizationList } from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterOrganizationTable,
    organizationTableColumns,
} from '../../components/table/Helpers';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const OrganizationsPage = () => {
    const [orgsToDisplay, setOrgsToDisplay] = useState<OrganizationDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const filteredOrgs: OrganizationDto[] = [];
    const [refreshData, setRefreshData] = useState<boolean>(false);

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['organizationList'],
        queryFn: async () => {
            return await getOrganizationList();
        },
    });

    useEffect(() => {
        if (refreshData === true) {
            setRefreshData(false);
        }
        if (data) {
            filterOrganizationTable(
                data,
                queryFilter,
                filteredOrgs,
                setOrgsToDisplay
            );
        }
    }, [queryFilter, data]);

    return (
        <Skeleton isLoaded={!isLoading}>
            <AppWrapper>
                <GenericTableWithSearchAndCreate
                    isLoaded={!isLoading}
                    setQueryFilter={setQueryFilter}
                    data={orgsToDisplay}
                    columns={organizationTableColumns()}
                    entity="org"
                    refreshData={setRefreshData}
                />
            </AppWrapper>
        </Skeleton>
    );
};
