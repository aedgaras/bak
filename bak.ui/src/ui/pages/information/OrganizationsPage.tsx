import { useEffect, useMemo, useState } from 'react';
import { getOrganizationList } from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto';
import {
    filterOrganizationTable,
    organizationTableColumns,
} from '../../components/datadisplay/datatablehelpers/organizationhelpers/helpers';
import { GenericTable } from '../../components/datadisplay/generic/GenericTable';
import { GenericTableWithSearchAndCreate } from '../../components/datadisplay/generic/tablewithsearch/GenericTableWithActions';
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
                    entityCreatePath={'/orgnizations/create'}
                    entityName={'Organization'}
                    genericTable={
                        <GenericTable
                            data={usersToDisplay}
                            columns={organizationTableColumns}
                            entityName="org"
                            refreshData={setRefreshData}
                        />
                    }
                />
            }
        />
    );
};
