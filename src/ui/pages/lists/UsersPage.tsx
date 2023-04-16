import { Button, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserService } from '../../../services';
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
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['usersList'],
        queryFn: async () => {
            const userService = new UserService();
            return await userService.list();
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
                    title={t('Table.Title.Users')}
                    entity={'user'}
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={usersToDisplay}
                    columns={userTableColumns()}
                    refreshData={setRefreshFlag}
                    createButton={
                        <Link to="create">
                            <Button color="teal">Create User</Button>
                        </Link>
                    }
                ></GenericTableWithSearchAndCreate>
            </Skeleton>
        </AppWrapper>
    );
};
