import { Input } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { AppWrapper } from '../../components/AppWrapper';
import { BoxWithShadowMax } from '../../components/BoxWithShadow';
import { DataTable } from '../../components/GenericTable';

interface UserModel {
    id: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export const UsersPage = () => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    const getUsers = useCallback(async () => {
        const response = await axios.get<UserModel[]>(
            'http://localhost:3030/api/users'
        );
        return response.data;
    }, []);

    useEffect(() => {
        (async () => {
            const usersGotten = await getUsers();
            setUsers(usersGotten);
        })();
    }, []);

    return (
        <AppWrapper>
            <BoxWithShadowMax>
                <Input placeholder={'Search'} w={'auto'} p={2} />
                {!loading && users ? null : (
                    <DataTable data={users} columns={columns} />
                )}
            </BoxWithShadowMax>
        </AppWrapper>
    );
};
