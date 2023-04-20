import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isUser, useUserContext } from '../../../context/UserContext';
import { HealthRecordService } from '../../../services';
import { HealthRecordDto } from '../../../utils/dto';
import { GenericTableWithSearchAndCreate } from '../../components/table/GenericTable';
import {
    filterHeartRatesTable,
    healthRecordTableColumns,
} from '../../components/table/Helpers';

export const HealthRecordsPage = () => {
    const [healthRecords, setHealthRecords] = useState<HealthRecordDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<unknown>({});
    const { t } = useTranslation();
    const { state } = useUserContext();

    const adminHr = useQuery({
        queryKey: ['hr'],
        queryFn: async () => {
            const healthRecordService = new HealthRecordService();

            return await healthRecordService.list();
        },
        enabled: isUser() === false,
    });

    const userHr = useQuery({
        queryKey: ['userHr'],
        queryFn: async () => {
            const healthRecordService = new HealthRecordService();

            return await healthRecordService.getUserHealthRecords(
                state.userId!.toString()
            );
        },
        enabled: isUser() == true,
    });

    useEffect(() => {
        document.title = t('Pages.HealthRecordsPage');
        if (adminHr.data) {
            filterHeartRatesTable(adminHr.data!, queryFilter, setHealthRecords);
        }
        if (userHr.data) {
            filterHeartRatesTable(userHr.data!, queryFilter, setHealthRecords);
        }
    }, [queryFilter, adminHr.data!, userHr.data!, refreshFlag]);

    return (
        <GenericTableWithSearchAndCreate<HealthRecordDto>
            title={t('Table.Title.HealthRecords')}
            entity={'healthrecord'}
            filter={setQueryFilter}
            data={healthRecords}
            columns={healthRecordTableColumns()}
            refreshData={setRefreshFlag}
            canDelete={!isUser()}
        />
    );
};
