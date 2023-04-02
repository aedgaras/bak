import { createColumnHelper } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { OrganizationDto, UserModel } from '../../../utils/dto';

export function filterOrganizationTable(
    data: OrganizationDto[],
    query: string,
    filteredEntries: OrganizationDto[],
    setDataToDisplay: React.Dispatch<React.SetStateAction<OrganizationDto[]>>
): void {
    if (query.length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.name
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                filteredEntries.push(dataEntry);
            }
        });

        setDataToDisplay(filteredEntries);
    } else {
        setDataToDisplay(data);
    }
}

export const organizationColumnHelper = createColumnHelper<OrganizationDto>();
export const organizationTableColumns = () => {
    const { t } = useTranslation();

    return [
        organizationColumnHelper.accessor('id', {
            cell: (info: { getValue: () => any }) => info.getValue(),
            header: 'Id',
        }),
        organizationColumnHelper.accessor('name', {
            cell: (info: { getValue: () => any }) => info.getValue(),
            header: t('Table.Headers.Organization.Name').toString(),
        }),
    ];
};

export function filterUserTable(
    data: UserModel[],
    query: string,
    setDataToDisplay: React.Dispatch<React.SetStateAction<UserModel[]>>
): void {
    const filteredEntries: UserModel[] = [];
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

export const userColumnHelper = createColumnHelper<UserModel>();
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
