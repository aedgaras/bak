export interface RequestQueryPagination {
    offset?: number;
    limit?: number;
}

export const pagingQueryExists = (query: RequestQueryPagination): boolean => {
    return (query.limit &&
        query.offset &&
        query.limit !== NaN &&
        query.offset !== NaN) as boolean;
};
