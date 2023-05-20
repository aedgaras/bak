import { CircularProgress, Divider, HStack, VStack } from '@chakra-ui/react';
import { BackButton } from '../navigation/BackButton';
import { BoxWithShadow } from './BoxWithShadow';

export const DataDisplay = ({
    isLoaded,
    element,
    backButton,
}: {
    isLoaded: boolean;
    element: JSX.Element;
    backButton?: boolean;
}) => {
    return (
        <BoxWithShadow>
            <VStack p={1} divider={<Divider />}>
                {!backButton ? (
                    <HStack w={'100%'}>
                        <BackButton />
                    </HStack>
                ) : null}

                {isLoaded ? element : <CircularProgress isIndeterminate />}
            </VStack>
        </BoxWithShadow>
    );
};
