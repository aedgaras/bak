import { DeleteIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
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
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { Link } from 'react-router-dom';

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

export function UserDataTable<Data extends object>({
    data,
    columns,
}: DataTableProps<Data>) {
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
    });

    return (
        <Table as={TableContainer}>
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
                                        ) : null}
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
                                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </Td>
                            );
                        })}
                        <Td key={row.id + '_details'}>
                            <Link to={`${row.getVisibleCells()[0].getValue()}`}>
                            <Button
                            >
                                Details
                            </Button></Link>

                        </Td>
                        <Td key={row.id + '_delete'}>
                            <Button
                                onClick={(e) => {
                                    setToDeleteId([row.getVisibleCells()[0].getValue() as string])
                                    onOpen();
                                }}
                            >
                                <DeleteIcon color={'red'} />
                            </Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete User
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={(e) =>{console.log(toDeleteId);onClose();}} ml={3}>
                                Delete

                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Table>
    );
}
