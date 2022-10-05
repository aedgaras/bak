import { Grid, GridItem } from '@chakra-ui/react';
import { AppWrapper } from '../../components/AppWrapper';
import { BoxWithShadowMax } from '../../components/BoxWithShadow';

export const ProfilePage = () => {
    return (
        <AppWrapper>
            <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1}>
                    <BoxWithShadowMax>Profile</BoxWithShadowMax>
                </GridItem>
                <GridItem colSpan={2}>
                    <BoxWithShadowMax>Profile</BoxWithShadowMax>
                </GridItem>
                <GridItem colSpan={2}>
                    <BoxWithShadowMax>Profile</BoxWithShadowMax>
                </GridItem>
                <GridItem colSpan={4}>
                    <BoxWithShadowMax>Profile</BoxWithShadowMax>
                </GridItem>
            </Grid>
        </AppWrapper>
    );
};
