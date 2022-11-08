import { Divider, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { BackButton } from '../../navigation/BackButton';
import { BoxWithShadow } from '../../wrappers/BoxWithShadow';

export const DataDisplay = ({
    isLoaded,
    element,
}: {
    isLoaded: boolean;
    element: JSX.Element;
}) => {
    return (
        <Skeleton isLoaded={isLoaded}>
            <BoxWithShadow>
                <VStack p={1} divider={<Divider />}>
                    <HStack w={'100%'}>
                        <BackButton />
                    </HStack>
                    <>{element}</>
                </VStack>
            </BoxWithShadow>
        </Skeleton>
    );
};
