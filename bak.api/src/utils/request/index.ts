export interface RequestQueryPagination {
    offset: number;
    limit: number;
}

export const pagingQueryExists = (query: RequestQueryPagination): boolean => {
    return (query.limit &&
        query.offset &&
        query.limit !== NaN &&
        query.offset !== NaN) as boolean;
};

export const ListResponse = <T>(
    paging: RequestQueryPagination,
    count: number,
    data: T
) => {
    const totalPages = Math.ceil(count / paging.limit);
    const currentPage = Math.ceil(count / paging.offset);

    return {
        paging: {
            total: count,
            page: currentPage,
            pages: totalPages,
        },
        data: data,
    };
};
