import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Input, Skeleton, Spacer } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosAuthHeaders } from '../../../utils/constants';
import { UserModel } from '../../../utils/Models/Models';
import { UserDataTable } from '../../components/datadisplay/GenericTable';
import { AppWrapper } from '../../components/wrappers/AppWrapper';
import { BoxWithShadowMax } from '../../components/wrappers/BoxWithShadow';

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
    columnHelper.accessor('role', {
        cell: (info) => info.getValue(),
        header: 'Role',
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
    document.title = 'Users Page';

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
                if (
                    user.id
                        .toString()
                        .toLowerCase()
                        .includes(queryFilter.toLowerCase()) ||
                    user.username
                        .toLowerCase()
                        .includes(queryFilter.toLowerCase()) ||
                    user.role
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
                <Skeleton isLoaded={isLoaded}>
                    <HStack p={2}>
                        <Input
                            placeholder={'Search'}
                            w={'auto'}
                            p={2}
                            onChange={(e) => setQueryFilter(e.target.value)}
                        />
                        <Spacer />
                        <Link to="/users/create">
                            <Button rightIcon={<AddIcon />} colorScheme="teal">
                                Create User
                            </Button>
                        </Link>
                    </HStack>

                    <Box padding={2}>
                        <Box borderWidth="1px" borderRadius="lg" padding={2}>
                            <UserDataTable
                                data={usersToDisplay}
                                columns={columns}
                            />
                        </Box>
                    </Box>
                </Skeleton>
            </BoxWithShadowMax>
        </AppWrapper>
    );
};
