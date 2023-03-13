import {Skeleton} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {getUsersList} from '../../../services/Requests';
import {UserModel} from '../../../utils/dto';
import {GenericTableWithSearchAndCreate} from '../../components/table/GenericTable';
import {filterUserTable, userTableColumns,} from '../../components/table/Helpers';
import {AppWrapper} from '../../components/wrappers/AppWrapper';

export const UsersPage = () => {
    const [usersToDisplay, setUsersToDisplay] = useState<UserModel[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});

    const {isLoading, isFetching, error, data} = useQuery({
        queryKey: ['usersList'],
        queryFn: async () => {
            return await getUsersList();
        },
    });

    useEffect(() => {
        if (data) {
            filterUserTable(data, queryFilter, setUsersToDisplay);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <Skeleton isLoaded={!isLoading}>
            <AppWrapper>
                <GenericTableWithSearchAndCreate<UserModel>
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={usersToDisplay}
                    columns={userTableColumns()}
                    entity={'user'}
                    refreshData={setRefreshFlag}
                />
            </AppWrapper>
        </Skeleton>
    );
};
