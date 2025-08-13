
export class GetProductoPaginatedQuery {
  constructor(
    public readonly page: number = 1,
    public readonly size: number = 10,
    public readonly nombre?: string,
    public readonly categoriaId?: string

  ) { }
}