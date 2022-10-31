import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Input, Skeleton, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../../../context/UserContext';
import { BoxWithShadowMax } from '../../../wrappers/BoxWithShadow';

export interface GenericTableWithSearchAndCreateProps<T> {
    isLoaded: boolean;
    setQueryFilter: React.Dispatch<React.SetStateAction<string>>;
    dataDisplay: T[];
    entityCreatePath: string;
    entityName: string;
    genericTable: JSX.Element;
}

export const GenericTableWithSearchAndCreate = <T extends unknown>({
    isLoaded,
    setQueryFilter,
    entityCreatePath,
    entityName,
    genericTable,
}: GenericTableWithSearchAndCreateProps<T>) => {
    const userContext = useUserContext();
    return (
        <BoxWithShadowMax>
            <Skeleton isLoaded={isLoaded}>
                <HStack p={2}>
                    <Input
                        placeholder={'Search'}
                        w={'auto'}
                        p={2}
                        onChange={(e) => setQueryFilter(e.target.value)}
                    />
                    <Spacer />
                    {userContext.role === 'admin' ? (
                        <Link to={entityCreatePath}>
                            <Button rightIcon={<AddIcon />} colorScheme="teal">
                                Create {entityName}
                            </Button>
                        </Link>
                    ) : null}
                </HStack>

                <Box padding={2}>
                    <Box borderWidth="1px" borderRadius="lg" padding={2}>
                        {genericTable}
                    </Box>
                </Box>
            </Skeleton>
        </BoxWithShadowMax>
    );
};
