import { Tag } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AnimalDto,
    CaseDto,
    DiagnosisDto,
    HealthRecordDto,
    RecipeDto,
    ResultDto,
    UserDto,
} from '../../types';
import {
    formatedDate,
    getClassificationType,
    getRoleType,
    getStatusType,
    getUrgencyType,
} from '../../utils/utils';
import {
    AnimalTag,
    HealthRecordHeartRate,
    StatusTag,
    UrgencyTag,
} from './GenericTable';
import { CaseTypeTag } from './TableElements';

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
                dataEntry.classification
                    .toString()
                    .toLowerCase()
                    .includes(query)
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
                dataEntry.heartRate
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

export function filterCasesTable(
    data: CaseDto[],
    query: string,
    setDataToDisplay: Dispatch<SetStateAction<CaseDto[]>>
): void {
    const filteredEntries: CaseDto[] = [];
    if (query.trim().length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.status
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.urgency
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

export function filterDiagnosisTable(
    data: DiagnosisDto[],
    query: string,
    setDataToDisplay: Dispatch<SetStateAction<DiagnosisDto[]>>
): void {
    const filteredEntries: DiagnosisDto[] = [];
    if (query.trim().length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.diagnosis
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.caseType.toString().includes(query.toLowerCase())
            ) {
                filteredEntries.push(dataEntry);
            }
        });

        setDataToDisplay(filteredEntries);
    } else {
        setDataToDisplay(data);
    }
}

export function filterResultsTable(
    data: ResultDto[],
    query: string,
    setDataToDisplay: Dispatch<SetStateAction<ResultDto[]>>
): void {
    const filteredEntries: ResultDto[] = [];
    if (query.trim().length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.result
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.caseType.toString().includes(query.toLowerCase())
            ) {
                filteredEntries.push(dataEntry);
            }
        });

        setDataToDisplay(filteredEntries);
    } else {
        setDataToDisplay(data);
    }
}

export function filterRecipessTable(
    data: RecipeDto[],
    query: string,
    setDataToDisplay: Dispatch<SetStateAction<RecipeDto[]>>
): void {
    const filteredEntries: RecipeDto[] = [];
    if (query.trim().length > 0) {
        data.forEach((dataEntry) => {
            if (
                dataEntry.id
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                dataEntry.title.toLowerCase().includes(query.toLowerCase()) ||
                dataEntry.entryDate.toString().includes(query.toLowerCase())
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
            cell: (info) => (
                <Tag size={'lg'}>
                    {t(
                        `Enums.User.Role.${getRoleType(info.cell.getValue())}`
                    ).toString()}
                </Tag>
            ),
            header: t('Table.Headers.User.Role').toString(),
        }),
        userColumnHelper.accessor('classification', {
            cell: (info) => (
                <Tag size={'lg'}>
                    {t(
                        `Enums.User.Classification.${getClassificationType(
                            info.cell.getValue()
                        )}`
                    ).toString()}
                </Tag>
            ),

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
            cell: (info) => <AnimalTag animalType={info.getValue()} />,
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
        healthRecordColumnHelper.accessor('animal', {
            cell: (info) => info.getValue()?.name,
            header: t('Table.Headers.Animal.Name').toString(),
        }),
        healthRecordColumnHelper.accessor('heartRate', {
            cell: (info) => <HealthRecordHeartRate bpm={info.getValue()} />,
            header: t('Table.Headers.HeartRate.HeartRate').toString(),
        }),
        healthRecordColumnHelper.accessor('entryDate', {
            cell: (info) => formatedDate(info.getValue()),
            header: t('Form.Diangosis.CaseDate').toString(),
        }),
    ];
};

const casesColumnHelper = createColumnHelper<CaseDto>();
export const caseTableColumns = () => {
    const { t } = useTranslation();

    return [
        casesColumnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            header: 'Id',
        }),
        casesColumnHelper.accessor('status', {
            cell: (info) => (
                <StatusTag status={getStatusType(info.cell.getValue())} />
            ),
            header: t('Form.Case.Status').toString(),
        }),
        casesColumnHelper.accessor('urgency', {
            cell: (info) => (
                <UrgencyTag urgency={getUrgencyType(info.cell.getValue())} />
            ),
            header: t('Form.Case.Priority').toString(),
        }),
        casesColumnHelper.accessor('entryDate', {
            cell: (info) => formatedDate(info.getValue()),
            header: t('Form.Date').toString(),
        }),
    ];
};

const diagnosesColumnHelper = createColumnHelper<DiagnosisDto>();
export const diagnosisTableColumns = () => {
    const { t } = useTranslation();

    return [
        diagnosesColumnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            header: 'Id',
        }),
        diagnosesColumnHelper.accessor('caseType', {
            cell: (info) => <CaseTypeTag label={info.cell.getValue()} />,
            header: t('Form.Diagnosis.Type').toString(),
        }),
        diagnosesColumnHelper.accessor('diagnosis', {
            cell: (info) => info.getValue(),
            header: t('Form.Diagnosis.Diagnosis').toString(),
        }),
    ];
};

const resultColumnHelper = createColumnHelper<ResultDto>();
export const resultTableColumns = () => {
    const { t } = useTranslation();

    return [
        resultColumnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            header: 'Id',
        }),
        resultColumnHelper.accessor('caseType', {
            cell: (info) => <CaseTypeTag label={info.cell.getValue()} />,
            header: t('Form.Diagnosis.Type').toString(),
        }),
        resultColumnHelper.accessor('result', {
            cell: (info) => info.getValue(),
            header: t('Form.Diagnosis.Result.Name').toString(),
        }),
    ];
};

const recipeColumnHelper = createColumnHelper<RecipeDto>();
export const recipeTableColumns = () => {
    const { t } = useTranslation();

    return [
        recipeColumnHelper.accessor('id', {
            cell: (info) => info.getValue(),
            header: 'Id',
        }),
        recipeColumnHelper.accessor('title', {
            cell: (info) => info.getValue(),
            header: t('Form.MedicineRecipe.Name').toString(),
        }),
        recipeColumnHelper.accessor('entryDate', {
            cell: (info) => formatedDate(info.getValue()),
            header: t('Table.Headers.DateCreated').toString(),
        }),
    ];
};
