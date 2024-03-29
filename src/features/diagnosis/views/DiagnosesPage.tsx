import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    GenericTableWithSearchAndCreate,
    diagnosisTableColumns,
    filterDiagnosisTable,
} from '../../../components';
import { DiagnosisService } from '../../../services';
import { DiagnosisDto } from '../../../types';

export const DiagnosesPage = () => {
    const [diagnoses, setDiagnoses] = useState<DiagnosisDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');

    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['diagnosesList'],
        queryFn: async () => {
            const diagnosisService = new DiagnosisService();
            return await diagnosisService.list();
        },
    });

    useEffect(() => {
        document.title = t('Pages.DiagnosesPage');
        if (data) {
            filterDiagnosisTable(data, queryFilter, setDiagnoses);
        }
    }, [queryFilter, data]);

    return (
        <Skeleton isLoaded={!isLoading}>
            <GenericTableWithSearchAndCreate
                title={t('Table.Title.Diagnoses')}
                entity={'diagnosis'}
                canDelete={true}
                filter={setQueryFilter}
                data={diagnoses}
                columns={diagnosisTableColumns()}
            ></GenericTableWithSearchAndCreate>
        </Skeleton>
    );
};
