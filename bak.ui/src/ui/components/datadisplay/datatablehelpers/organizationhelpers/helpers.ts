import { createColumnHelper } from '@tanstack/react-table';
import { OrganizationDto } from '../../../../../utils/dto/Organization';

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
    organizationColumnHelper.accessor('name', {
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'Name',
    }),
];
