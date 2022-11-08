import { useEffect, useMemo, useState } from 'react';
import { getUsersList } from '../../../services/Requests';
import { UserModel } from '../../../utils/dto';
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
    const [userToDeleteId, setUserToDeleteId] = useState<number>();
    const [refreshData, setRefreshData] = useState<boolean>(false);

    useMemo(() => {
        (async () => {
            const usersGotten = await getUsersList();
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
        <AppWrapper
            children={
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
            }
        />
    );
};
