import { createColumnHelper } from '@tanstack/react-table';
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
export const organizationTableColumns = [
    organizationColumnHelper.accessor('id', {
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'Id',
    }),
    organizationColumnHelper.accessor('name', {
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'Name',
    }),
];

export function filterUserTable(
    data: UserModel[],
    query: string,
    filteredEntries: UserModel[],
    setDataToDisplay: React.Dispatch<React.SetStateAction<UserModel[]>>
): void {
    if (query.length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.username
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.role
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.createdAt
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.updatedAt
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

export const userColumnHelper = createColumnHelper<UserModel>();
export const userTableColumns = [
    userColumnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: 'Id',
    }),
    userColumnHelper.accessor('username', {
        cell: (info) => info.getValue(),
        header: 'Username',
    }),
    userColumnHelper.accessor('role', {
        cell: (info) => info.getValue(),
        header: 'Role',
    }),
    userColumnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: 'Created At',
    }),
    userColumnHelper.accessor('updatedAt', {
        cell: (info) => info.getValue(),
        header: 'Updated At',
    }),
];
