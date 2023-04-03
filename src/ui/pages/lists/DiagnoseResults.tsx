import { Skeleton } from '@chakra-ui/react';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const DiagnoseResultsPage = () => {
    return (
        <AppWrapper>
            <Skeleton isLoaded={false}></Skeleton>
        </AppWrapper>
    );
};
