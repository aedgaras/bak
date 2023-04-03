import { Skeleton } from '@chakra-ui/react';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const AnimalsPage = () => {
    return (
        <AppWrapper>
            <Skeleton isLoaded={false}></Skeleton>
        </AppWrapper>
    );
};
