import {
    Avatar,
    Grid,
    GridItem,
    Skeleton,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useMemo, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { UserModel } from '../../../Models/Models';
import { API_URL, getJwtFromStorage } from '../../../utils/utils';
import { AppWrapper } from '../../components/AppWrapper';
import { BoxWithShadowMax } from '../../components/BoxWithShadow';

export const ProfilePage = () => {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState<UserModel>();

    useMemo(async () => {
        const getUser = await axios
            .get<UserModel>(
                `${API_URL}/users/getByUsername/${userContext.name}`,
                {
                    headers: {
                        authorization: getJwtFromStorage() ?? '',
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((r) => {
                console.log(r);
            });
    }, []);

    return (
        <AppWrapper>
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1}>
                    <Skeleton isLoaded={true}>
                        <BoxWithShadowMax>
                            <Wrap>
                                <WrapItem>
                                    <Avatar
                                        name={userContext.name}
                                        src={''}
                                        size={'2xl'}
                                    />
                                </WrapItem>
                            </Wrap>
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
