import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    GenericTableWithSearchAndCreate,
    filterHeartRatesTable,
    healthRecordTableColumns,
} from '../../../components';
import { isUser, useUserContext } from '../../../providers/UserProvider';
import { HealthRecordService } from '../../../services';
import { HealthRecordDto } from '../../../utils/dto';

export const HealthRecordsPage = () => {
    const [healthRecords, setHealthRecords] = useState<HealthRecordDto[]>([]);
    const [queryFilter, setQueryFilter] = useState<string>('');
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
    }, [queryFilter, adminHr.data!, userHr.data!]);

    return (
        <GenericTableWithSearchAndCreate<HealthRecordDto>
            title={t('Table.Title.HealthRecords')}
            entity={'healthrecord'}
            filter={setQueryFilter}
            data={healthRecords}
            columns={healthRecordTableColumns()}
            canDelete={!isUser()}
        />
    );
};
