import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RecipeService } from '../../../services';
import { MedicineRecipeDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterRecipessTable,
    recipeTableColumns,
} from '../../components/table/Helpers';

export const RecipesPage = () => {
    const [recipes, setRecipes] = useState<MedicineRecipeDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['recipesList'],
        queryFn: async () => {
            const recipeService = new RecipeService();
            return await recipeService.list();
        },
    });

    useEffect(() => {
        document.title = t('Pages.RecipesPage');
        if (data) {
            filterRecipessTable(data, queryFilter, setRecipes);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <Skeleton isLoaded={!isLoading}>
            <GenericTableWithSearchAndCreate
                title={t('Table.Title.Recipe')}
                canDelete={true}
                filter={setQueryFilter}
                data={recipes}
                columns={recipeTableColumns()}
                refreshData={setRefreshFlag}
                entity={'recipe'}
            ></GenericTableWithSearchAndCreate>
        </Skeleton>
    );
};
