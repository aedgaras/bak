import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { axiosAuthHeaders } from '../../../utils/constants';
import { OrganizationDto } from '../../../utils/dto/Organization';
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

    const getUsers = useCallback(async () => {
        const response = await axios
            .get<OrganizationDto[]>(
                'http://localhost:3030/api/organizations',
                axiosAuthHeaders
            )
            .then((r: AxiosResponse<OrganizationDto[]>) => {
                return r.data;
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
    }, []);

    useEffect(() => {
        filterOrganizationTable(
            users,
            queryFilter,
            filteredUsers,
            setUsersToDisplay
        );
    }, [queryFilter, users]);

    return (
        <AppWrapper>
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
                    />
                }
            />
        </AppWrapper>
    );
};
