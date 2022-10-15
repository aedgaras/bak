import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { axiosAuthHeaders } from '../../../utils/constants';
import { UserModel } from '../../../utils/Models/Models';
import {
    filterUserTable,
    userTableColumns,
} from '../../components/datadisplay/datatablehelpers/userhelpers/helpers';
import { GenericTable } from '../../components/datadisplay/generic/GenericTable';
import { GenericTableWithSearchAndCreate } from '../../components/datadisplay/generic/tablewithsearch/GenericTableWithActions';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const UsersPage = () => {
    const [usersToDisplay, setUsersToDisplay] = useState<UserModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const filteredUsers: UserModel[] = [];

    const getUsers = useCallback(async () => {
        const response = await axios
            .get<UserModel[]>(
                'http://localhost:3030/api/users',
                axiosAuthHeaders
            )
            .then((r: AxiosResponse<UserModel[]>) => {
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
        filterUserTable(users, queryFilter, filteredUsers, setUsersToDisplay);
    }, [queryFilter, users]);

    return (
        <AppWrapper>
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
                    />
                }
            />
        </AppWrapper>
    );
};
