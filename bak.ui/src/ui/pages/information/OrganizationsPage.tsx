import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRequest } from '../../../services/Requests';
import { OrganizationDto } from '../../../utils/dto/Organization';
import { ListResponse } from '../../../utils/Models/Models';
import {
    filterOrganizationTable,
    organizationTableColumns,
} from '../../components/datadisplay/datatablehelpers/organizationhelpers/helpers';
import { GenericTable } from '../../components/datadisplay/generic/GenericTable';
import { GenericTableWithSearchAndCreate } from '../../components/datadisplay/generic/tablewithsearch/GenericTableWithActions';

export const OrganizationsPage = () => {
    const [usersToDisplay, setUsersToDisplay] = useState<OrganizationDto[]>([]);
    const [users, setUsers] = useState<OrganizationDto[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const filteredUsers: OrganizationDto[] = [];
    const [refreshData, setRefreshData] = useState<boolean>(false);

    const getUsers = useCallback(async () => {
        const response = getRequest<ListResponse<OrganizationDto[]>>(
            '/organizations'
        ).then((r: AxiosResponse<ListResponse<OrganizationDto[]>>) => {
            return r.data.data;
        });
        return response;
    }, []);

    useMemo(() => {
        (async () => {
            const usersGotten = await getUsers();
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
    );
};
