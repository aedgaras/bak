import {
    Avatar,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input,
    Select,
    Skeleton,
    Spacer,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { UserModel } from '../../../Models/Models';
import { API_URL, axiosAuthHeaders } from '../../../utils/utils';
import { AppWrapper } from '../../components/AppWrapper';
import { BoxWithShadowMax } from '../../components/BoxWithShadow';

export const ProfilePage = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<UserModel>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [cantEdit, setCantEdit] = useState<boolean>(true);

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
                            <VStack p={1}>
                                <HStack w={'100%'}>
                                    <Text>Profile editing</Text>
                                    <Spacer />
                                    <Switch
                                        defaultChecked={false}
                                        onChange={(
                                            event: ChangeEvent<HTMLInputElement>
                                        ) => setCantEdit(!cantEdit)}
                                    />
                                </HStack>
                                <Divider />
                                <Avatar
                                    name={userContext.name}
                                    src={''}
                                    size={'2xl'}
                                />
                                <FormControl>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        isDisabled={cantEdit}
                                        value={user?.username}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        isDisabled={cantEdit}
                                        type={'password'}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        isDisabled={cantEdit}
                                        placeholder={
                                            user?.role == 'admin'
                                                ? 'Admin'
                                                : 'User'
                                        }
                                    >
                                        <option value={'admin'}>Admin</option>
                                        <option value={'user'}>User</option>
                                    </Select>
                                </FormControl>
                                {cantEdit ? null : (
                                    <HStack w={'100%'}>
                                        <Button type="submit">Submit</Button>
                                    </HStack>
                                )}
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
