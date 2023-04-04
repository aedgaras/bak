import { createColumnHelper } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimalDto, HealthRecordDto, UserDto } from '../../../utils/dto';

export function filterUserTable(
    data: UserDto[],
    query: string,
    setDataToDisplay: Dispatch<SetStateAction<UserDto[]>>
): void {
    const filteredEntries: UserDto[] = [];
    if (query.trim().length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.username
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.role.toString().toLowerCase().includes(query) ||
                dataEntry.classification.toLowerCase().includes(query)
            ) {
                filteredEntries.push(dataEntry);
            }
        });

        setDataToDisplay(filteredEntries);
    } else {
        setDataToDisplay(data);
    }
}

export function filterAnimalsTable(
    data: AnimalDto[],
    query: string,
    setDataToDisplay: Dispatch<SetStateAction<AnimalDto[]>>
): void {
    const filteredEntries: AnimalDto[] = [];
    if (query.trim().length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.name.toLowerCase().includes(query.toLowerCase()) ||
                dataEntry.type.toString().toLowerCase().includes(query)
            ) {
                filteredEntries.push(dataEntry);
            }
        });

        setDataToDisplay(filteredEntries);
    } else {
        setDataToDisplay(data);
    }
}

export function filterHeartRatesTable(
    data: HealthRecordDto[],
    query: string,
    setDataToDisplay: Dispatch<SetStateAction<HealthRecordDto[]>>
): void {
    const filteredEntries: HealthRecordDto[] = [];
    if (query.trim().length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.heartRate.toLowerCase().includes(query.toLowerCase())
            ) {
                filteredEntries.push(dataEntry);
            }
        });

        setDataToDisplay(filteredEntries);
    } else {
        setDataToDisplay(data);
    }
}

const userColumnHelper = createColumnHelper<UserDto>();
export const userTableColumns = () => {
    const { t } = useTranslation();

    return [
        userColumnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            header: 'Id',
        }),
        userColumnHelper.accessor('username', {
            cell: (info) => info.getValue(),
            header: t('Table.Headers.User.Username').toString(),
        }),
        userColumnHelper.accessor('role', {
            cell: (info) => info.getValue(),
            header: t('Table.Headers.User.Role').toString(),
        }),
        userColumnHelper.accessor('classification', {
            cell: (info) => info.getValue(),
            header: t('Table.Headers.User.Classification').toString(),
        }),
    ];
};

const animalColumnHelper = createColumnHelper<AnimalDto>();
export const animalTableColumns = () => {
    const { t } = useTranslation();

    return [
        animalColumnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            header: 'Id',
        }),
        animalColumnHelper.accessor('name', {
            cell: (info) => info.getValue(),
            header: t('Table.Headers.Animal.Name').toString(),
        }),
        animalColumnHelper.accessor('type', {
            cell: (info) => info.getValue(),
            header: t('Table.Headers.Animal.Type').toString(),
        }),
    ];
};

const healthRecordColumnHelper = createColumnHelper<HealthRecordDto>();
export const healthRecordTableColumns = () => {
    const { t } = useTranslation();

    return [
        healthRecordColumnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            header: 'Id',
        }),
        healthRecordColumnHelper.accessor('heartRate', {
            cell: (info) => info.getValue(),
            header: t('Table.Headers.HeartRate.HeartRate').toString(),
        }),
    ];
};
