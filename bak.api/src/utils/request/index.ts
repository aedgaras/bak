export interface RequestQueryPagination {
    offset: number;
    limit: number;
}

export interface PaginatedResponse<T> {
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
