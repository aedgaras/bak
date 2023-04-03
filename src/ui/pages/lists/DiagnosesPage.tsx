import { Skeleton } from '@chakra-ui/react';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const DiagnosesPage = () => {
    return (
        <AppWrapper>
            <Skeleton isLoaded={false}></Skeleton>
        </AppWrapper>
    );
};
