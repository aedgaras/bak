import { Input, Skeleton } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UserModel } from '../../../Models/Models';
import { axiosAuthHeaders } from '../../../utils/utils';
import { AppWrapper } from '../../components/AppWrapper';
import { BoxWithShadowMax } from '../../components/BoxWithShadow';
import { DataTable } from '../../components/GenericTable';

const columnHelper = createColumnHelper<UserModel>();
const columns = [
    columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: 'Id',
    }),
    columnHelper.accessor('username', {
        cell: (info) => info.getValue(),
        header: 'Username',
    }),
    columnHelper.accessor('password', {
        cell: (info) => info.getValue(),
        header: 'Password',
    }),
    columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Created At',
    }),
    columnHelper.accessor('updatedAt', {
        cell: (info) => info.getValue(),
        header: 'Updated At',
    }),
];

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

    const filterUsers = () => {
        if (queryFilter.length > 0) {
            users.forEach((user) => {
                console.log(user.createdAt);
                if (
                    user.id
                        .toString()
                        .toLowerCase()
                        .includes(queryFilter.toLowerCase()) ||
                    user.username
                        .toLowerCase()
                        .includes(queryFilter.toLowerCase()) ||
                    user.password
                        .toLowerCase()
                        .includes(queryFilter.toLowerCase()) ||
                    user.createdAt
                        .toString()
                        .toLowerCase()
                        .includes(queryFilter.toLowerCase()) ||
                    user.updatedAt
                        .toString()
                        .toLowerCase()
                        .includes(queryFilter.toLowerCase())
                ) {
                    filteredUsers.push(user);
                }
            });

            setUsersToDisplay(filteredUsers);
        } else {
            setUsersToDisplay(users);
        }
    };

    useMemo(() => {
        (async () => {
            const usersGotten = await getUsers();
            setUsers(usersGotten);
            setUsersToDisplay(users);
            setIsLoaded(true);
        })();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [queryFilter, users]);

    return (
        <AppWrapper>
            <BoxWithShadowMax>
                <Input
                    placeholder={'Search'}
                    w={'auto'}
                    p={2}
                    onChange={(e) => setQueryFilter(e.target.value)}
                />
                <Skeleton isLoaded={isLoaded}>
                    <DataTable data={usersToDisplay} columns={columns} />
                </Skeleton>
            </BoxWithShadowMax>
        </AppWrapper>
    );
};
