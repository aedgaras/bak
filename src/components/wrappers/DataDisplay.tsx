import { Divider, HStack, VStack } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { BackButton } from '../navigation/BackButton';
import { BoxWithShadow } from './BoxWithShadow';

export const DataDisplay: React.FC<PropsWithChildren> = (props) => {
    return (
        <BoxWithShadow>
            <VStack p={1} divider={<Divider />}>
                <HStack w={'100%'}>
                    <BackButton />
                </HStack>

                {props.children}
            </VStack>
        </BoxWithShadow>
    );
};
