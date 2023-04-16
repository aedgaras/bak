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
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const CasePage = () => {
    const [cases, setCases] = useState<CaseDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['casesList'],
        queryFn: async () => {
            const caseService = new CasesService();
            return await caseService.getCaseList();
        },
    });

    useEffect(() => {
        if (data) {
            filterCasesTable(data, queryFilter, setCases);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <AppWrapper>
            <Skeleton isLoaded={!isLoading}>
                <GenericTableWithSearchAndCreate<CaseDto>
                    title={t('Table.Title.Cases')}
                    entity={'case'}
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={cases}
                    columns={caseTableColumns()}
                    refreshData={setRefreshFlag}
                ></GenericTableWithSearchAndCreate>
            </Skeleton>
        </AppWrapper>
    );
};
