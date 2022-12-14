import { useEffect, useMemo, useState } from 'react';
import { getOrganizationList } from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterOrganizationTable,
    organizationTableColumns,
} from '../../components/table/Helpers';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const OrganizationsPage = () => {
    const [usersToDisplay, setUsersToDisplay] = useState<OrganizationDto[]>([]);
    const [users, setUsers] = useState<OrganizationDto[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const filteredUsers: OrganizationDto[] = [];
    const [refreshData, setRefreshData] = useState<boolean>(false);

    useMemo(() => {
        (async () => {
            const usersGotten = await getOrganizationList();
            setUsers(usersGotten);
            setUsersToDisplay(users);
            setIsLoaded(true);
        })();
    }, [refreshData]);

    useEffect(() => {
        if (refreshData === true) {
            setRefreshData(false);
        }
        filterOrganizationTable(
            users,
            queryFilter,
            filteredUsers,
            setUsersToDisplay
        );
    }, [queryFilter, users]);

    return (
        <AppWrapper
            children={
                <GenericTableWithSearchAndCreate
                    isLoaded={isLoaded}
                    setQueryFilter={setQueryFilter}
                    dataDisplay={usersToDisplay}
                    data={usersToDisplay}
                    columns={organizationTableColumns}
                    entity="org"
                    refreshData={setRefreshData}
                />
            }
        />
    );
};
