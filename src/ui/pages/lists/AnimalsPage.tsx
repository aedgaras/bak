import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AnimalService } from '../../../services';
import { AnimalDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    animalTableColumns,
    filterAnimalsTable,
} from '../../components/table/Helpers';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const AnimalsPage = () => {
    const [animals, setAnimals] = useState<AnimalDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['animalsList'],
        queryFn: async () => {
            const animalService = new AnimalService();
            return await animalService.getAnimalsList();
        },
    });

    useEffect(() => {
        if (data) {
            filterAnimalsTable(data, queryFilter, setAnimals);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <AppWrapper>
            <Skeleton isLoaded={!isLoading}>
                <GenericTableWithSearchAndCreate
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={animals}
                    columns={animalTableColumns()}
                    refreshData={setRefreshFlag}
                />
            </Skeleton>
        </AppWrapper>
    );
};
