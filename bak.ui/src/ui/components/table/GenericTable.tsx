import {
    AddIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DeleteIcon,
    MinusIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons';
import {
    Box,
    Button,
    chakra,
    HStack,
    Input,
    Select,
    Skeleton,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import { DeleteDialog } from '../dialogs';
import { BoxWithShadowMax } from '../wrappers/BoxWithShadow';

export interface GenericTableWithSearchAndCreateProps<T extends object>
    extends DataTableProps<T> {
    isLoaded: boolean;
    setQueryFilter: React.Dispatch<React.SetStateAction<string>>;
    dataDisplay: T[];
}

export const GenericTableWithSearchAndCreate = <T extends object>({
    isLoaded,
    setQueryFilter,
    data,
    columns,
    entity,
    refreshData,
}: GenericTableWithSearchAndCreateProps<T>) => {
    const userContext = useUserContext();
    return (
        <BoxWithShadowMax>
            <Skeleton isLoaded={isLoaded}>
                <HStack p={2}>
                    <Input
                        placeholder={'Search'}
                        w={'auto'}
                        p={2}
                        onChange={(e) => setQueryFilter(e.target.value)}
                    />
                    <Spacer />
                    {userContext.role === 'admin' ? (
                        <Link
                            to={
                                entity === 'user'
                                    ? '/users/create'
                                    : '/orgnizations/create'
                            }
                        >
                            <Button rightIcon={<AddIcon />} colorScheme="teal">
                                Create{' '}
                                {entity === 'user' ? 'User' : 'Organization'}
                            </Button>
                        </Link>
                    ) : null}
                </HStack>

                <Box padding={2}>
                    <Box borderWidth="1px" borderRadius="lg" padding={2}>
                        <GenericTable
                            data={data}
                            columns={columns}
                            entity={entity}
                            refreshData={refreshData}
                        />
                    </Box>
                </Box>
            </Skeleton>
        </BoxWithShadowMax>
    );
};

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
    entity: 'user' | 'org';
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GenericTable<Data extends object>({
    data,
    columns,
    entity,
    refreshData,
}: DataTableProps<Data>) {
    // Use the state and functions returned from useTable to build your UI
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toDeleteId, setToDeleteId] = React.useState<string[]>([]);
    const cancelRef = React.useRef(null);
    const userContext = useUserContext();

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
        getFilteredRowModel: getFilteredRowModel(),
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
                            {userContext.role === 'admin' ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <Td></Td>
                                    <Td></Td>
                                </>
                            )}
                        </Tr>
                    ))}
                </Tbody>
                <DeleteDialog
                    isOpen={isOpen}
                    cancelRef={cancelRef}
                    onClose={onClose}
                    entityToDeleteId={toDeleteId[0]}
                    entityName={entity}
                    refreshData={refreshData}
                />
                <Tfoot></Tfoot>
            </Table>
            <HStack pt={2} spacing={2}>
                <Button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ArrowLeftIcon />
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon />
                </Button>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon />
                </Button>
                <Button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ArrowRightIcon />
                </Button>
                <Spacer />
                <Box>
                    <Text>
                        {'Page '}
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </Text>
                </Box>
                <Box>
                    <Select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 30, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </Box>
            </HStack>
        </TableContainer>
    );
}
