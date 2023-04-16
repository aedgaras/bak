import { Button, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RecipeService } from '../../../services';
import { MedicineRecipeDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterRecipessTable,
    recipeTableColumns,
} from '../../components/table/Helpers';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const RecipesPage = () => {
    const [recipes, setRecipes] = useState<MedicineRecipeDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['recipesList'],
        queryFn: async () => {
            const recipeService = new RecipeService();
            return await recipeService.getRecipesList();
        },
    });

    useEffect(() => {
        if (data) {
            filterRecipessTable(data, queryFilter, setRecipes);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <AppWrapper>
            <Skeleton isLoaded={!isLoading}>
                <GenericTableWithSearchAndCreate
                    title={t('Table.Title.Recipe')}
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={recipes}
                    columns={recipeTableColumns()}
                    refreshData={setRefreshFlag}
                    entity={'recipe'}
                    createButton={
                        <Link to="create">
                            <Button color="teal">Create Medicine Recipe</Button>
                        </Link>
                    }
                ></GenericTableWithSearchAndCreate>
            </Skeleton>
        </AppWrapper>
    );
};
