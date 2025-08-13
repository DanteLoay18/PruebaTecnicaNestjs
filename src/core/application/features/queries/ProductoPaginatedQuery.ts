
export class GetProductoPaginatedQuery {
    constructor(
      public readonly page: number = 1,
      public readonly size: number = 10,
      public readonly userRole?: string, // opcional, para filtrar por rol
    ) {}
  }