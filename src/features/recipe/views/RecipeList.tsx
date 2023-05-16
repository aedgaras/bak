import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    GenericTableWithSearchAndCreate,
    filterRecipessTable,
    recipeTableColumns,
} from '../../../components';
import { RecipeService } from '../../../services';
import { MedicineRecipeDto } from '../../../types/dto';

export const RecipeList = () => {
    const [recipes, setRecipes] = useState<MedicineRecipeDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
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
    }, [queryFilter, data]);

    return (
        <Skeleton isLoaded={!isLoading}>
            <GenericTableWithSearchAndCreate
                title={t('Table.Title.Recipe')}
                canDelete={true}
                filter={setQueryFilter}
                data={recipes}
                columns={recipeTableColumns()}
                entity={'recipe'}
            ></GenericTableWithSearchAndCreate>
        </Skeleton>
    );
};
