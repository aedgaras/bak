import { Response } from 'express';

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
        !Number.isNaN(query.limit) &&
        !Number.isNaN(query.offset)) as boolean;
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

function baseResponse(res: Response, statusCode: number, obj?: any) {
    if (obj === undefined) {
        return res.sendStatus(statusCode);
    }

    return res.status(statusCode).json(obj);
}

export function Ok(res: Response, obj?: any) {
    return baseResponse(res, 200, obj);
}

export function BadRequest(res: Response, obj?: any) {
    return baseResponse(res, 400, obj);
}
export function Unauthorized(res: Response, obj?: any) {
    return baseResponse(res, 401, obj);
}

export function Forbiden(res: Response, obj?: any) {
    return baseResponse(res, 403, obj);
}
export function NotFound(res: Response, obj?: any) {
    return baseResponse(res, 404, obj);
}
