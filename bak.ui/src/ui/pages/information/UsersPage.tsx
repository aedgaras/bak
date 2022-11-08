import { useEffect, useMemo, useState } from 'react';
import { getUsersList } from '../../../services/Requests';
import { UserModel } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterUserTable,
    userTableColumns,
} from '../../components/table/Helpers';
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
                    data={usersToDisplay}
                    columns={userTableColumns}
                    entity={'user'}
                    refreshData={setRefreshData}
                />
            }
        />
    );
};
