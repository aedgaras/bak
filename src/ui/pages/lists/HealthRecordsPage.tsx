import { Skeleton } from '@chakra-ui/react';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const HealthRecordsPage = () => {
    return (
        <AppWrapper>
            <Skeleton isLoaded={false}></Skeleton>
        </AppWrapper>
    );
};
