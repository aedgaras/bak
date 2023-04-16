import { Button, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DiagnosisService } from '../../../services';
import { DiagnosisDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    diagnosisTableColumns,
    filterDiagnosisTable,
} from '../../components/table/Helpers';
import { AppWrapper } from '../../components/wrappers/AppWrapper';

export const DiagnosesPage = () => {
    const [diagnoses, setDiagnoses] = useState<DiagnosisDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});
    const { t } = useTranslation();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['diagnosesList'],
        queryFn: async () => {
            const diagnosisService = new DiagnosisService();
            return await diagnosisService.list();
        },
    });

    useEffect(() => {
        if (data) {
            filterDiagnosisTable(data, queryFilter, setDiagnoses);
        }
    }, [queryFilter, data, refreshFlag]);

    return (
        <AppWrapper>
            <Skeleton isLoaded={!isLoading}>
                <GenericTableWithSearchAndCreate
                    title={t('Table.Title.Diagnoses')}
                    entity={'diagnosis'}
                    isLoaded={!isLoading}
                    filter={setQueryFilter}
                    data={diagnoses}
                    columns={diagnosisTableColumns()}
                    refreshData={setRefreshFlag}
                    createButton={
                        <Link to="create">
                            <Button color="teal">Create Diagnosis</Button>
                        </Link>
                    }
                ></GenericTableWithSearchAndCreate>
            </Skeleton>
        </AppWrapper>
    );
};
