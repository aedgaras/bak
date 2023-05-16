import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DeleteIcon,
    MinusIcon,
    PhoneIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    HStack,
    Heading,
    Icon,
    Input,
    Select,
    Skeleton,
    Spacer,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    chakra,
    useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
    ColumnDef,
    Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCat, FaDog } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { isUser, useUserContext } from '../../providers/UserProvider';
import { HealthRecordService } from '../../services';
import { getAnimalType } from '../../utils/utils';
import { DeleteDialog } from '../dialogs';
import { BoxWithShadowMax } from '../wrappers';

type Entity =
    | 'user'
    | 'animal'
    | 'case'
    | 'diagnosis'
    | 'result'
    | 'healthrecord'
    | 'recipe';

type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
    createButton?: JSX.Element;
    entity: Entity;
    canDelete: boolean;
};

export interface GenericTableWithSearchAndCreateProps<T extends object>
    extends DataTableProps<T> {
    filter: Dispatch<SetStateAction<string>>;
    title: string;
}

export const GenericTableWithSearchAndCreate = <T extends object>({
    filter,
    data,
    columns,

    createButton,
    title,
    entity,
    canDelete,
}: GenericTableWithSearchAndCreateProps<T>) => {
    const { state } = useUserContext();
    const { t } = useTranslation();

    return (
        <BoxWithShadowMax>
            <Center p={4} pb="8">
                <Heading as="h4">{title}</Heading>
            </Center>
            <BoxWithShadowMax>
                <HStack p={2}>
                    <Input
                        placeholder={t('Table.Search').toString()}
                        w={'auto'}
                        p={2}
                        onChange={(e) => filter(e.target.value)}
                    />
                    <Spacer />
                    {createButton}
                </HStack>
                <Box padding={2}>
                    <Box borderWidth="1px" borderRadius="lg" padding={2}>
                        <GenericTable
                            data={data}
                            columns={columns}
                            entity={entity}
                            canDelete={canDelete}
                        />
                    </Box>
                </Box>
            </BoxWithShadowMax>
        </BoxWithShadowMax>
    );
};

export function GenericCreate<Data extends object>({
    entity,
    row,
}: {
    entity: Entity;
    row: Row<Data>;
}) {
    const { t } = useTranslation();
    const { state } = useUserContext();

    return (
        <>
            {entity === 'healthrecord' ? (
                !isUser() ? (
                    <>
                        <Td key={row.id + '_details'}>
                            <Link
                                to={`rate/${row
                                    .getVisibleCells()[0]
                                    .getValue()}`}
                            >
                                <Button>{t('Table.Buttons.Rate')}</Button>
                            </Link>
                        </Td>
                    </>
                ) : null
            ) : null}
            {entity === 'animal' ? (
                <>
                    <Td key={row.id + '_create'}>
                        <Link
                            to={
                                'createHealthRecord/' +
                                row.getVisibleCells()[0].getValue()
                            }
                        >
                            <Button>
                                {t('Table.Buttons.CreateHealthRecord')}
                            </Button>
                        </Link>
                    </Td>
                </>
            ) : null}
            {entity === 'case' &&
            (state.classification === 'Veterinarian' ||
                state.role === 'Admin') ? (
                <>
                    <Td key={row.id + '_create'}>
                        <Link
                            to={
                                'createDiagnosis/' +
                                row.getVisibleCells()[0].getValue()
                            }
                        >
                            <Button>
                                {t('Table.Buttons.CreateDiagnosis')}
                            </Button>
                        </Link>
                    </Td>
                </>
            ) : null}
            {entity === 'diagnosis' ? (
                <>
                    <Td key={row.id + '_create'}>
                        <Link
                            to={
                                'createResult/' +
                                row.getVisibleCells()[0].getValue()
                            }
                        >
                            <Button>{t('Table.Buttons.CreateResult')}</Button>
                        </Link>
                    </Td>
                </>
            ) : null}

            {entity === 'result' &&
            (state.classification === 'Veterinarian' ||
                state.role === 'Admin') ? (
                <>
                    <Td key={row.id + '_create'}>
                        <Link
                            to={
                                'createRecipe/' +
                                row.getVisibleCells()[0].getValue()
                            }
                        >
                            <Button>{t('Table.Buttons.CreateRecipe')}</Button>
                        </Link>
                    </Td>
                </>
            ) : null}
        </>
    );
}

const PhoneTooltip = ({ id }: { id: string }) => {
    const healthRecordService = new HealthRecordService();

    const { isLoading, isFetching, error, data } = useQuery({
        queryFn: async () => {
            return await healthRecordService.getHealthRecordsContactInfo(id);
        },
    });

    return (
        <Skeleton isLoaded={!isLoading}>
            <Tooltip hasArrow label={data?.phoneNumber}>
                <PhoneIcon />
            </Tooltip>
        </Skeleton>
    );
};

export const HealthRecordHeartRate = ({ bpm }: { bpm: string }) => {
    const { t } = useTranslation();
    const num = parseInt(bpm);

    let color = 'teal';
    let label = t('Table.HeartRate.Bpm.Normal');

    if (num <= 40) {
        label = t('Table.HeartRate.Bpm.Abnormal');
        color = 'red';
    } else if (num >= 100) {
        label = t('Table.HeartRate.Bpm.Abnormal');
        color = 'red';
    } else {
        label = t('Table.HeartRate.Bpm.Normal');
        color = 'teal';
    }

    return (
        <Tooltip label={label} hasArrow>
            <Tag size={'lg'} colorScheme={color}>
                {bpm}
            </Tag>
        </Tooltip>
    );
};

export const AnimalTag = ({ animalType }: { animalType: number }) => {
    const { t } = useTranslation();
    const animalBreed = getAnimalType(animalType);

    const icon =
        animalBreed === 'Cat' ? <Icon as={FaCat} /> : <Icon as={FaDog} />;

    return (
        <Box>
            {t(`Enums.Animal.${animalBreed}`)} {icon}
        </Box>
    );
};

export const UrgencyTag = ({ urgency }: { urgency: 'Normal' | 'Urgent' }) => {
    let color = 'teal';
    const { t } = useTranslation();

    if (urgency === 'Urgent') {
        color = 'red';
    }

    return (
        <Tag size={'lg'} colorScheme={color}>
            {t(`Enums.Case.Urgency.${urgency}`)}
        </Tag>
    );
};

export const StatusTag = ({
    status,
}: {
    status: 'Closed' | 'Completed' | 'Ongoing' | 'Filled';
}) => {
    let color = 'red';
    const { t } = useTranslation();

    if (status === 'Filled') {
        color = 'orange';
    } else if (status === 'Ongoing') {
        color = 'blue';
    } else if (status === 'Completed') {
        color = 'teal';
    }

    return (
        <Tag size={'lg'} colorScheme={color}>
            {t(`Enums.Case.Status.${status}`)}
        </Tag>
    );
};

export function GenericTable<Data extends object>({
    data,
    columns,
    entity,
    canDelete,
}: DataTableProps<Data>) {
    // Use the state and functions returned from useTable to build your UI
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toDeleteId, setToDeleteId] = React.useState<string[]>([]);
    const cancelRef = React.useRef(null);
    const { t } = useTranslation();

    const { state } = useUserContext();

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
                            <Th />
                            {entity === 'healthrecord' ? <Th /> : null}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr
                            key={row.id}
                            _hover={{
                                backgroundColor: 'gray.400',
                            }}
                            onClick={(e) => {}}
                        >
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
                            <GenericCreate entity={entity} row={row} />
                            {entity === 'healthrecord' ? (
                                <Td>
                                    <PhoneTooltip
                                        id={
                                            row
                                                .getVisibleCells()[0]
                                                .getValue() as string
                                        }
                                    />
                                </Td>
                            ) : null}
                            <>
                                <Td key={row.id + '_details'}>
                                    <Link
                                        to={`${row
                                            .getVisibleCells()[0]
                                            .getValue()}`}
                                    >
                                        <Button>
                                            {t('Table.Buttons.Details')}
                                        </Button>
                                    </Link>
                                </Td>
                                {canDelete ? (
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
                                ) : null}
                            </>
                        </Tr>
                    ))}
                </Tbody>

                <DeleteDialog
                    isOpen={isOpen}
                    cancelRef={cancelRef}
                    onClose={onClose}
                    entity={entity}
                    id={toDeleteId[0]}
                />
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
                <Box pr={1}>
                    <Text>
                        {`${t('Table.Page')}` + ' '}
                        {table.getState().pagination.pageIndex + 1}{' '}
                        {t('Table.Of')} {table.getPageCount()}
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
                                {`${t('Table.Show')} ${pageSize}`}
                            </option>
                        ))}
                    </Select>
                </Box>
            </HStack>
        </TableContainer>
    );
}

export function GenericHomePageTable<Data extends object>({
    data,
    columns,
    entity,
    canDelete,
}: DataTableProps<Data>) {
    // Use the state and functions returned from useTable to build your UI
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pageIndex, setPageIndex] = React.useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toDeleteId, setToDeleteId] = React.useState<string[]>([]);
    const cancelRef = React.useRef(null);
    const { t } = useTranslation();

    const { state } = useUserContext();

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            pagination: {
                pageSize: 3,
                pageIndex: pageIndex,
            },
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
                            {canDelete ? <Th /> : null}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr
                            key={row.id}
                            _hover={{
                                backgroundColor: 'gray.400',
                            }}
                            onClick={(e) => {}}
                        >
                            {row.getVisibleCells().map((cell) => {
                                const meta: any = cell.column.columnDef.meta;
                                return (
                                    <Td
                                        key={cell.id + cell.row}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                );
                            })}

                            {canDelete ? (
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
                            ) : null}
                        </Tr>
                    ))}
                </Tbody>

                <DeleteDialog
                    isOpen={isOpen}
                    cancelRef={cancelRef}
                    onClose={onClose}
                    entity={entity}
                    id={toDeleteId[0]}
                />
            </Table>
            <HStack pt={2} spacing={2} px={2} pb={1}>
                <Button
                    onClick={() => setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon />
                </Button>
                <Button
                    onClick={() => setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon />
                </Button>
                <Spacer />
                <Box>
                    <Text>
                        {`${t('Table.Page')}` + ' '}
                        {table.getState().pagination.pageIndex + 1}{' '}
                        {t('Table.Of')} {table.getPageCount()}
                    </Text>
                </Box>
            </HStack>
        </TableContainer>
    );
}
