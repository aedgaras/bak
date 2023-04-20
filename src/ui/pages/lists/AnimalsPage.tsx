import { Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { isUser, useUserContext } from '../../../context/UserContext';
import { AnimalService } from '../../../services';
import { AnimalDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    animalTableColumns,
    filterAnimalsTable,
} from '../../components/table/Helpers';

export const AnimalsPage = () => {
    const { state } = useUserContext();
    const [animals, setAnimals] = useState<AnimalDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});
    const { t } = useTranslation();

    const admin = useQuery({
        queryKey: ['animalsList'],
        queryFn: async () => {
            const service = new AnimalService();

            return await service.list();
        },
        enabled: isUser() === false,
    });

    const user = useQuery({
        queryKey: ['useranimalsList'],
        queryFn: async () => {
            const service = new AnimalService();

            return await service.getUserAnimals(state.userId!.toString());
        },
        enabled: isUser() == true,
    });

    useEffect(() => {
        document.title = t('Pages.AnimalsPage');
        if (admin.data) {
            filterAnimalsTable(admin.data!, queryFilter, setAnimals);
        }
        if (user.data) {
            filterAnimalsTable(user.data!, queryFilter, setAnimals);
        }
    }, [queryFilter, admin.data!, user.data!, refreshFlag]);

    return (
        <GenericTableWithSearchAndCreate
            title={t('Table.Title.Animals')}
            entity={'animal'}
            filter={setQueryFilter}
            data={animals}
            canDelete={true}
            columns={animalTableColumns()}
            refreshData={setRefreshFlag}
            createButton={
                <Link to="create">
                    <Button color="teal">{t('Table.CreateAnimal')}</Button>
                </Link>
            }
        />
    );
};
