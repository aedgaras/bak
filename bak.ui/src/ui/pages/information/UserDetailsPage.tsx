import {
    Avatar,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Select,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { UserModel } from '../../../Models/Models';
import { API_URL, axiosAuthHeaders } from '../../../utils/utils';
import { AppWrapper } from '../../components/AppWrapper';
import { BoxWithShadow } from '../../components/BoxWithShadow';

export const UserDetailsPage = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<UserModel>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const params = useParams();

    useMemo(async () => {
        await axios
            .get<UserModel>(
                `${API_URL}/users/${params.userId}`,
                axiosAuthHeaders
            )
            .then((r: AxiosResponse<UserModel>) => {
                setUser(r.data);
                setIsLoaded(true);
            });
    }, [userContext.name]);
    return (
        <AppWrapper>
            <Skeleton isLoaded={isLoaded}>
                <BoxWithShadow>
                    <VStack p={1}>
                        <Avatar name={userContext.name} src={''} size={'2xl'} />
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input value={user?.username} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type={'password'} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Select
                                placeholder={
                                    user?.role == 'admin' ? 'Admin' : 'User'
                                }
                            >
                                <option value={'admin'}>Admin</option>
                                <option value={'user'}>User</option>
                            </Select>
                        </FormControl>
                        <HStack w={'100%'}>
                            <Button type="submit">Submit</Button>
                        </HStack>
                    </VStack>
                </BoxWithShadow>
            </Skeleton>
        </AppWrapper>
    );
};
