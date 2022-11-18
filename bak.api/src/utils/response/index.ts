interface ReturnMessage {
    message: string;
}

export const returnMessage = (info: string): ReturnMessage =>
    ({ message: info } as ReturnMessage);

/**
 * Response texts.
 */

export const ENTITY_DOESNT_EXIST = (entityName: string) =>
    returnMessage(`Entity: ${entityName}, doesn\'t exist.`);
export const ENTITY_ALREADY_EXIST = (entityName: string) =>
    returnMessage(`Entity: ${entityName}, already exists.`);
export const ENTITY_NOT_FOUND = (entityName: string) =>
    returnMessage(`Entity: ${entityName} not found.`);
export const ENTITY_UPDATED = (entityName: string, entityId: number) =>
    returnMessage(`Entity ${entityName} with id: ${entityId} was updated.`);
export const ENTITY_DELETED = (entityName: string, entityId: number) =>
    returnMessage(`Entity ${entityName} with id: ${entityId} was deleted.`);

export interface RequestQueryPagination {
    offset: number;
    limit: number;
}

interface PaginatedResponse<T> {
    paging: {
        listCount: number;
        currentPage: number;
        totalPages: number;
    };
    data: T;
}

export const pagingQueryExists = (query: RequestQueryPagination): boolean => {
    return (query.limit &&
        query.offset &&
        query.limit !== NaN &&
        query.offset !== NaN) as boolean;
};

export const ListResponse = <T>(
    pagingQuery: RequestQueryPagination,
    dataCount: number,
    dataList: T
): PaginatedResponse<T> => {
    const totalPages = Math.ceil(dataCount / pagingQuery.limit);
    const currentPage = Math.ceil(dataCount / pagingQuery.offset);

    return {
        paging: {
            listCount: dataCount,
            currentPage: currentPage,
            totalPages: totalPages,
        },
        data: dataList,
    };
};
