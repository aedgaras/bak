import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CasesService } from '../../../services';
import { CaseDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    caseTableColumns,
    filterCasesTable,
} from '../../components/table/Helpers';

export const CasePage = () => {
    const [cases, setCases] = useState<CaseDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['casesList'],
        queryFn: async () => {
            const caseService = new CasesService();
            return await caseService.list();
        },
    });

    useEffect(() => {
        document.title = t('Pages.CasesPage');
        if (data) {
            filterCasesTable(data, queryFilter, setCases);
        }
    }, [queryFilter, data]);

    return (
        <Skeleton isLoaded={!isLoading}>
            <GenericTableWithSearchAndCreate<CaseDto>
                title={t('Table.Title.Cases')}
                entity={'case'}
                canDelete={true}
                filter={setQueryFilter}
                data={cases}
                columns={caseTableColumns()}
            ></GenericTableWithSearchAndCreate>
        </Skeleton>
    );
};
