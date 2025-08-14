export interface PaginateParams<T>{
    size: number;
    page: number;
    count: number;
    results: T[];

}

export class Paginated<T>{

    public results: T[];
    public totalRecords:number;
    public pageSize: number;
    public totalPages: number;
    public currentPage: number;

    static create<T>(params: PaginateParams<T>){
        const response: Paginated<T>={
            results : params.results,
            currentPage: params.page,
            pageSize: params.size,
            totalPages: Math.ceil(params.count / params.size),
            totalRecords: params.count
        }
        return response;
    }

    static getOffset(page:number, size:number){
        return size * (page-1);
    }
}