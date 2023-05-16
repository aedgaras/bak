import { Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
    GenericTableWithSearchAndCreate,
    animalTableColumns,
    filterAnimalsTable,
} from '../../../components';
import { isUser, useUserContext } from '../../../providers/UserProvider';
import { AnimalService } from '../../../services';
import { AnimalDto } from '../../../utils/dto';

export const AnimalsPage = () => {
    const { state } = useUserContext();

    return isUser() ? userAnimalTable() : adminAnimalTable();
};

const userAnimalTable = () => {
    const [animals, setAnimals] = useState<AnimalDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const { t } = useTranslation();
    const { state } = useUserContext();

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
        if (user.data) {
            filterAnimalsTable(user.data!, queryFilter, setAnimals);
        }
    }, [queryFilter, user.data!]);

    return (
        <GenericTableWithSearchAndCreate
            title={t('Table.Title.Animals')}
            entity={'animal'}
            filter={setQueryFilter}
            data={animals}
            canDelete={true}
            columns={animalTableColumns()}
            createButton={
                state.classification === 'Customer' ? (
                    <Link to="create">
                        <Button color="teal">{t('Table.CreateAnimal')}</Button>
                    </Link>
                ) : (
                    <></>
                )
            }
        />
    );
};

const adminAnimalTable = () => {
    const [animals, setAnimals] = useState<AnimalDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const { state } = useUserContext();
    const { t } = useTranslation();

    const admin = useQuery({
        queryKey: ['animalsList'],
        queryFn: async () => {
            const service = new AnimalService();

            return await service.list();
        },
    });

    useEffect(() => {
        document.title = t('Pages.AnimalsPage');
        if (admin.data) {
            filterAnimalsTable(admin.data!, queryFilter, setAnimals);
        }
    }, [queryFilter, admin.data!]);

    return (
        <GenericTableWithSearchAndCreate
            title={t('Table.Title.Animals')}
            entity={'animal'}
            filter={setQueryFilter}
            data={animals}
            canDelete={true}
            columns={animalTableColumns()}
            createButton={
                state.classification === 'Customer' ? (
                    <Link to="create">
                        <Button color="teal">{t('Table.CreateAnimal')}</Button>
                    </Link>
                ) : (
                    <></>
                )
            }
        />
    );
};
