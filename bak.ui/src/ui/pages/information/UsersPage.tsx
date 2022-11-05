import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { axiosAuthHeaders } from '../../../utils/constants';
import { ListResponse, UserModel } from '../../../utils/Models/Models';
import {
    filterUserTable,
    userTableColumns,
} from '../../components/datadisplay/datatablehelpers/userhelpers/helpers';
import { GenericTable } from '../../components/datadisplay/generic/GenericTable';
import { GenericTableWithSearchAndCreate } from '../../components/datadisplay/generic/tablewithsearch/GenericTableWithActions';

export const UsersPage = () => {
    const [usersToDisplay, setUsersToDisplay] = useState<UserModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const filteredUsers: UserModel[] = [];
    const [userToDeleteId, setUserToDeleteId] = useState<number>();
    const [refreshData, setRefreshData] = useState<boolean>(false);

    const getUsers = useCallback(async () => {
        const response = await axios
            .get('http://localhost:3030/api/users', axiosAuthHeaders)
            .then((r: AxiosResponse<ListResponse<UserModel[]>>) => {
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
        filterUserTable(users, queryFilter, filteredUsers, setUsersToDisplay);
    }, [queryFilter, users]);

    return (
        <GenericTableWithSearchAndCreate
            isLoaded={isLoaded}
            setQueryFilter={setQueryFilter}
            dataDisplay={usersToDisplay}
            entityCreatePath={'/users/create'}
            entityName={'User'}
            genericTable={
                <GenericTable
                    data={usersToDisplay}
                    columns={userTableColumns}
                    entityName={'user'}
                    refreshData={setRefreshData}
                />
            }
        />
    );
};
