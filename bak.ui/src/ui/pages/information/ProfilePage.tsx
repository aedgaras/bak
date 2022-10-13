import { Avatar, FormControl, FormLabel, Grid, GridItem, Input, Skeleton, VStack } from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { useContext, useMemo, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { UserModel } from '../../../Models/Models';
import { API_URL, axiosAuthHeaders } from '../../../utils/utils';
import { AppWrapper } from '../../components/AppWrapper';
import { BoxWithShadowMax } from '../../components/BoxWithShadow';

export const ProfilePage = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<UserModel>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useMemo(async () => {
        await axios
            .get<UserModel>(
                `${API_URL}/users/getByUsername/${userContext.name}`,
                axiosAuthHeaders
            )
            .then((r: AxiosResponse<UserModel>) => {
                setUser(r.data);
                setIsLoaded(true);
            });
            console.log('rendered')
    }, [userContext.name]);

    return (
        <AppWrapper>
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1}>
                    <Skeleton isLoaded={isLoaded}>
                        <BoxWithShadowMax>
                            <VStack>
                                <Avatar
                                    name={userContext.name}
                                    src={''}
                                    size={'2xl'}
                                />
                                <FormControl>
                                    <FormLabel>Username</FormLabel>
                                    <Input value={user?.username}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Input type={'password'} value={user?.password}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input value={user?.role}/>
                                </FormControl>
                            </VStack>
                        </BoxWithShadowMax>
                    </Skeleton>
                </GridItem>
                <GridItem colSpan={2}>
                    <Skeleton isLoaded={false}>
                        <BoxWithShadowMax>Profile</BoxWithShadowMax>
                    </Skeleton>
                </GridItem>
                <GridItem colSpan={2}>
                    <Skeleton isLoaded={false}>
                        <BoxWithShadowMax>Profile</BoxWithShadowMax>
                    </Skeleton>
                </GridItem>
                <GridItem colSpan={4}>
                    <Skeleton isLoaded={false}>
                        <BoxWithShadowMax>Profile</BoxWithShadowMax>
                    </Skeleton>
                </GridItem>
            </Grid>
        </AppWrapper>
    );
};
