import {
    DeleteIcon,
    MinusIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons';
import {
    Button,
    chakra,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { DeleteDialog } from '../../dialogs/DeleteDialog';

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

export function GenericTable<Data extends object>({
    data,
    columns,
}: DataTableProps<Data>) {
    // Use the state and functions returned from useTable to build your UI
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toDeleteId, setToDeleteId] = React.useState<string[]>([]);
    const cancelRef = React.useRef(null);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <TableContainer>
            <Table as={Table} variant="striped" colorScheme="teal">
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const meta: any = header.column.columnDef.meta;
                                return (
                                    <Th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        <chakra.span pl="4">
                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() ===
                                                'desc' ? (
                                                    <TriangleDownIcon aria-label="sorted descending" />
                                                ) : (
                                                    <TriangleUpIcon aria-label="sorted ascending" />
                                                )
                                            ) : (
                                                <MinusIcon aria-label="unsorted" />
                                            )}
                                        </chakra.span>
                                    </Th>
                                );
                            })}
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                const meta: any = cell.column.columnDef.meta;
                                return (
                                    <Td
                                        key={cell.id}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                );
                            })}
                            <Td key={row.id + '_details'}>
                                <Link
                                    to={`${row
                                        .getVisibleCells()[0]
                                        .getValue()}`}
                                >
                                    <Button>Details</Button>
                                </Link>
                            </Td>
                            <Td key={row.id + '_delete'}>
                                <Button
                                    onClick={(e) => {
                                        setToDeleteId([
                                            row
                                                .getVisibleCells()[0]
                                                .getValue() as string,
                                        ]);
                                        onOpen();
                                    }}
                                >
                                    <DeleteIcon color={'red'} />
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
                <DeleteDialog
                    isOpen={isOpen}
                    cancelRef={cancelRef}
                    onClose={onClose}
                    entityToDeleteId={toDeleteId[0]}
                />
            </Table>
        </TableContainer>
    );
}
