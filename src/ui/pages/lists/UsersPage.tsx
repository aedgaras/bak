import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { API } from '../../../services';
import { UserDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterUserTable,
    userTableColumns,
} from '../../components/table/Helpers';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const UsersPage = () => {
    const [usersToDisplay, setUsersToDisplay] = useState<UserDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['usersList'],
        queryFn: async () => {
            const api = new API();
            return await api.getUsersList();
        },
    });

    useEffect(() => {
        if (data) {
            filterUserTable(data, queryFilter, setUsersToDisplay);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <AppWrapper>
            <Skeleton isLoaded={!isLoading}>
                <GenericTableWithSearchAndCreate<UserDto>
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={usersToDisplay}
                    columns={userTableColumns()}
                    refreshData={setRefreshFlag}
                />
            </Skeleton>
        </AppWrapper>
    );
};
