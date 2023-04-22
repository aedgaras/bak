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

export const UsersPage = () => {
    const [usersToDisplay, setUsersToDisplay] = useState<UserDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['usersList'],
        queryFn: async () => {
            const userService = new UserService();
            return await userService.list();
        },
    });

    useEffect(() => {
        document.title = t('Pages.UsersPage');
        if (data) {
            filterUserTable(data, queryFilter, setUsersToDisplay);
        }
    }, [queryFilter, data]);

    return (
        <Skeleton isLoaded={!isLoading}>
            <GenericTableWithSearchAndCreate<UserDto>
                title={t('Table.Title.Users')}
                entity={'user'}
                canDelete={true}
                filter={setQueryFilter}
                data={usersToDisplay}
                columns={userTableColumns()}
                createButton={
                    <Link to="create">
                        <Button color="teal">Create User</Button>
                    </Link>
                }
            ></GenericTableWithSearchAndCreate>
        </Skeleton>
    );
};
