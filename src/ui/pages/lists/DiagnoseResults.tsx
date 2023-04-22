import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResultsService } from '../../../services';
import { ResultDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterResultsTable,
    resultTableColumns,
} from '../../components/table/Helpers';

export const DiagnosesResultsPage = () => {
    const [results, setResults] = useState<ResultDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');

    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['resultsList'],
        queryFn: async () => {
            const resultServie = new ResultsService();
            return await resultServie.list();
        },
    });

    useEffect(() => {
        document.title = t('Pages.ResultsPage');
        if (data) {
            filterResultsTable(data, queryFilter, setResults);
        }
    }, [queryFilter, data]);

    return (
        <Skeleton isLoaded={!isLoading}>
            <GenericTableWithSearchAndCreate
                title={t('Table.Title.Results')}
                entity={'result'}
                canDelete={true}
                filter={setQueryFilter}
                data={results}
                columns={resultTableColumns()}
            ></GenericTableWithSearchAndCreate>
        </Skeleton>
    );
};
