import {
    Avatar,
    Grid,
    GridItem,
    Skeleton,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { AppWrapper } from '../../components/AppWrapper';
import { BoxWithShadowMax } from '../../components/BoxWithShadow';

export const ProfilePage = () => {
    const userContext = useContext(UserContext);
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
                                        src={""}
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
