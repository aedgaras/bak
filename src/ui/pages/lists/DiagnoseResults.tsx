import { Button, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ResultsService } from '../../../services';
import { ResultDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterResultsTable,
    resultTableColumns,
} from '../../components/table/Helpers';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const DiagnosesResultsPage = () => {
    const [results, setResults] = useState<ResultDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['resultsList'],
        queryFn: async () => {
            const resultServie = new ResultsService();
            return await resultServie.getResultsList();
        },
    });

    useEffect(() => {
        if (data) {
            filterResultsTable(data, queryFilter, setResults);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <AppWrapper>
            <Skeleton isLoaded={!isLoading}>
                <GenericTableWithSearchAndCreate
                    title={t('Table.Title.Results')}
                    entity={'result'}
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={results}
                    columns={resultTableColumns()}
                    refreshData={setRefreshFlag}
                    createButton={
                        <Link to="create">
                            <Button color="teal">
                                Create Diagnosis Result
                            </Button>
                        </Link>
                    }
                ></GenericTableWithSearchAndCreate>
            </Skeleton>
        </AppWrapper>
    );
};
